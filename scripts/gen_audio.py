"""Record natural audio (Punjabi, Marathi, Bengali) for every line in scripts/texts.json with AI4Bharat's open-source
Indic Parler-TTS (Apache-2.0, https://huggingface.co/ai4bharat/indic-parler-tts). No account or key needed.

Only missing clips are made. Work is committed every few clips, and the run stops before GitHub's
time limit, so a long first run continues in the next run.
"""
import json, os, subprocess, sys, time, tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
AUDIO = ROOT / "public" / "audio"
# One recommended Indic Parler-TTS speaker per language (override with SPEAKER_PA / SPEAKER_MR / SPEAKER_BN).
SPEAKERS = {
    "pa": os.environ.get("SPEAKER_PA", "Divjot"),
    "mr": os.environ.get("SPEAKER_MR", "Sunita"),
    "bn": os.environ.get("SPEAKER_BN", "Aditi"),
}


def describe(speaker):
    return (
        f"{speaker} speaks in a friendly, natural, conversational tone at a moderate pace. "
        "The recording is of very high quality, with the voice sounding clear and very close up, with no background noise."
    )
BUDGET_MIN = float(os.environ.get("BUDGET_MINUTES", "300"))
COMMIT_EVERY = int(os.environ.get("COMMIT_EVERY", "20"))
COMMIT = os.environ.get("COMMIT", "0") == "1"


def write_manifest():
    keys = sorted(p.stem for p in AUDIO.glob("*.mp3"))
    (AUDIO / "manifest.json").write_text(json.dumps({"voices": SPEAKERS, "keys": keys}))
    return len(keys)


def commit(msg):
    if not COMMIT:
        return
    subprocess.run(["git", "add", "public/audio"], cwd=ROOT, check=True)
    if subprocess.run(["git", "diff", "--cached", "--quiet"], cwd=ROOT).returncode != 0:
        subprocess.run(["git", "commit", "-q", "-m", msg], cwd=ROOT, check=True)
        subprocess.run(["git", "pull", "-q", "--rebase", "origin", "main"], cwd=ROOT, check=True)
        subprocess.run(["git", "push", "-q", "origin", "HEAD:main"], cwd=ROOT, check=True)


def main():
    AUDIO.mkdir(parents=True, exist_ok=True)
    texts = json.loads((ROOT / "scripts" / "texts.json").read_text())
    todo = [t for t in texts if not (AUDIO / f"{t['key']}.mp3").exists()]
    print(f"{len(todo)} of {len(texts)} lines need audio", flush=True)
    if not todo:
        write_manifest()
        return 0

    import numpy as np, torch, soundfile as sf
    from parler_tts import ParlerTTSForConditionalGeneration
    from transformers import AutoTokenizer

    torch.set_num_threads(os.cpu_count() or 2)
    model = ParlerTTSForConditionalGeneration.from_pretrained("ai4bharat/indic-parler-tts").eval()
    tok = AutoTokenizer.from_pretrained("ai4bharat/indic-parler-tts")
    desc_tok = AutoTokenizer.from_pretrained(model.config.text_encoder._name_or_path)
    descs = {lang: desc_tok(describe(sp), return_tensors="pt") for lang, sp in SPEAKERS.items()}

    def synth(desc, prompt, sample):
        with torch.no_grad():
            out = model.generate(
                input_ids=desc.input_ids,
                attention_mask=desc.attention_mask,
                prompt_input_ids=prompt.input_ids,
                prompt_attention_mask=prompt.attention_mask,
                **({"do_sample": True, "temperature": 0.8} if sample else {}),
            )
        return np.atleast_1d(out.cpu().numpy().squeeze())

    start = time.time()
    made = failed = tried = 0
    try:
        for t in todo:
            if (time.time() - start) / 60 > BUDGET_MIN:
                print("Time budget reached; the next run continues.", flush=True)
                break
            tried += 1
            desc = descs.get(t.get("lang", "pa"), descs["pa"])
            # The model rambles on after a line with no closing punctuation, so always end the sentence.
            text = t["text"].strip()
            if text[-1] not in ".?!।॥":
                text += "."
            prompt = tok(text, return_tensors="pt")
            sr = model.config.sampling_rate
            longest = (0.12 * len(text) + 1.0) * sr  # longer than this means extra babble after the phrase
            best = None
            for attempt in range(3):
                wav = synth(desc, prompt, attempt > 0)
                if wav.size < sr // 10:  # under 0.1 s: nothing useful
                    continue
                if best is None or wav.size < best.size:
                    best = wav
                if wav.size <= longest:
                    break
            if best is None:
                failed += 1
                print(f"[skip] no audio for {text}", flush=True)
                continue
            wav = best[: int(longest)]
            with tempfile.NamedTemporaryFile(suffix=".wav") as tmp:
                sf.write(tmp.name, wav, model.config.sampling_rate)
                subprocess.run(
                    ["ffmpeg", "-loglevel", "error", "-y", "-i", tmp.name, "-af", "silenceremove=start_periods=1:start_threshold=-50dB,areverse,silenceremove=start_periods=1:start_threshold=-50dB,areverse",
                     "-ac", "1", "-b:a", "48k", str(AUDIO / f"{t['key']}.mp3")],
                    check=True,
                )
            made += 1
            print(f"[{made}/{len(todo)}] {t['text']}", flush=True)
            if made % COMMIT_EVERY == 0:
                write_manifest()
                commit(f"Add natural audio ({made} new clips)")
    finally:
        # Save whatever was recorded, even if something crashed
        total = write_manifest()
        commit(f"Add natural audio ({made} new clips)")
        print(f"Made {made} clips, skipped {failed}; {total} in total.", flush=True)
    remaining = len(todo) - tried
    if os.environ.get("GITHUB_OUTPUT"):
        with open(os.environ["GITHUB_OUTPUT"], "a") as f:
            f.write(f"remaining={remaining}\n")
    return 0


if __name__ == "__main__":
    sys.exit(main())
