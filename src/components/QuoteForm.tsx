import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Mic,
  MicOff,
  ShieldCheck,
  Clock,
  Star,
  Phone,
  CheckCircle,
  MapPin,
  Home,
  Calendar,
  User,
  FileCheck,
  Square,
} from "lucide-react";
import { useState, useRef, useCallback, useEffect } from "react";

const trustPoints = [
  { icon: ShieldCheck, text: "Insured up to £50k" },
  { icon: Clock, text: "Quote in 60 seconds" },
  { icon: Star, text: "4.9★ rated service" },
];

const STEPS = [
  { label: "Move Details", icon: MapPin },
  { label: "Move Size", icon: Home },
  { label: "Move Date", icon: Calendar },
  { label: "Contact", icon: User },
  { label: "Consent", icon: FileCheck },
];

type FormData = {
  fromPostcode: string;
  toPostcode: string;
  propertyType: string;
  floorLevel: string;
  liftAvailable: string;
  bedrooms: string;
  moveSize: string;
  moveDate: string;
  flexibleDates: string;
  fullName: string;
  email: string;
  consent: boolean;
};

const initialFormData: FormData = {
  fromPostcode: "",
  toPostcode: "",
  propertyType: "",
  floorLevel: "",
  liftAvailable: "",
  bedrooms: "",
  moveSize: "",
  moveDate: "",
  flexibleDates: "",
  fullName: "",
  email: "",
  consent: false,
};

const QuoteForm = () => {
  const [mode, setMode] = useState<"form" | "audio">("form");
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(initialFormData);

  // Audio state
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const MAX_RECORDING_TIME = 90;

  const updateField = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const canAdvance = (): boolean => {
    switch (step) {
      case 0:
        return !!(formData.fromPostcode && formData.toPostcode && formData.propertyType && formData.floorLevel && formData.liftAvailable);
      case 1:
        return !!formData.bedrooms;
      case 2:
        return !!(formData.moveDate && formData.flexibleDates);
      case 3:
        return !!(formData.fullName && formData.email);
      case 4:
        return formData.consent;
      default:
        return false;
    }
  };

  const handleSubmit = () => {
    if (mode === "audio") {
      console.log("Audio quote submitted", { audioBlob, formData: { fullName: formData.fullName, email: formData.email, consent: formData.consent } });
    } else {
      console.log("Form quote submitted:", formData);
    }
  };

  // Audio recording
  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream, { mimeType: MediaRecorder.isTypeSupported("audio/webm") ? "audio/webm" : "audio/mp4" });
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: mediaRecorder.mimeType });
        setAudioBlob(blob);
        setAudioUrl(URL.createObjectURL(blob));
        stream.getTracks().forEach((t) => t.stop());
      };

      mediaRecorder.start(1000);
      setIsRecording(true);
      setRecordingTime(0);
      setAudioBlob(null);
      setAudioUrl(null);

      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => {
          if (prev >= MAX_RECORDING_TIME - 1) {
            stopRecording();
            return MAX_RECORDING_TIME;
          }
          return prev + 1;
        });
      }, 1000);
    } catch {
      alert("Could not access microphone. Please allow microphone access.");
    }
  }, []);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current?.state === "recording") {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

  // Render helpers
  const OptionButton = ({ selected, onClick, children }: { selected: boolean; onClick: () => void; children: React.ReactNode }) => (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      className={`px-4 py-2.5 rounded-xl font-body text-sm font-medium border-2 transition-all ${
        selected
          ? "border-funky-orange bg-funky-orange/10 text-foreground shadow-md"
          : "border-border/50 bg-card text-muted-foreground hover:border-funky-gold/50"
      }`}
    >
      {children}
    </motion.button>
  );

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-body font-semibold text-foreground mb-1.5">Moving From (Postcode)</label>
                <input className="input-funky w-full" placeholder="e.g. BD1 1AA" value={formData.fromPostcode} onChange={(e) => updateField("fromPostcode", e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-body font-semibold text-foreground mb-1.5">Moving To (Postcode)</label>
                <input className="input-funky w-full" placeholder="e.g. M14 5RG" value={formData.toPostcode} onChange={(e) => updateField("toPostcode", e.target.value)} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-body font-semibold text-foreground mb-1.5">Property Type</label>
              <div className="flex flex-wrap gap-2">
                {["Flat", "House", "Office"].map((t) => (
                  <OptionButton key={t} selected={formData.propertyType === t} onClick={() => updateField("propertyType", t)}>
                    {t}
                  </OptionButton>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-body font-semibold text-foreground mb-1.5">Floor Level</label>
              <div className="flex flex-wrap gap-2">
                {["Ground", "1st", "2nd", "3rd+"].map((f) => (
                  <OptionButton key={f} selected={formData.floorLevel === f} onClick={() => updateField("floorLevel", f)}>
                    {f}
                  </OptionButton>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-body font-semibold text-foreground mb-1.5">Lift Available?</label>
              <div className="flex gap-2">
                {["Yes", "No"].map((v) => (
                  <OptionButton key={v} selected={formData.liftAvailable === v} onClick={() => updateField("liftAvailable", v)}>
                    {v}
                  </OptionButton>
                ))}
              </div>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-body font-semibold text-foreground mb-1.5">Number of Bedrooms</label>
              <div className="flex flex-wrap gap-2">
                {["1", "2", "3", "4+"].map((b) => (
                  <OptionButton key={b} selected={formData.bedrooms === b} onClick={() => updateField("bedrooms", b)}>
                    {b} Bed{b !== "1" ? "s" : ""}
                  </OptionButton>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-body font-semibold text-foreground mb-1.5">
                Estimated Move Size <span className="text-muted-foreground font-normal">(optional)</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {["Small", "Medium", "Large"].map((s) => (
                  <OptionButton key={s} selected={formData.moveSize === s} onClick={() => updateField("moveSize", s)}>
                    {s}
                  </OptionButton>
                ))}
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-body font-semibold text-foreground mb-1.5">Preferred Move Date</label>
              <input type="date" className="input-funky w-full" value={formData.moveDate} onChange={(e) => updateField("moveDate", e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-body font-semibold text-foreground mb-1.5">Flexible on Dates?</label>
              <div className="flex gap-2">
                {["Yes", "No"].map((v) => (
                  <OptionButton key={v} selected={formData.flexibleDates === v} onClick={() => updateField("flexibleDates", v)}>
                    {v}
                  </OptionButton>
                ))}
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-body font-semibold text-foreground mb-1.5">Full Name</label>
              <input className="input-funky w-full" placeholder="Your full name" value={formData.fullName} onChange={(e) => updateField("fullName", e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-body font-semibold text-foreground mb-1.5">Email Address</label>
              <input type="email" className="input-funky w-full" placeholder="your@email.com" value={formData.email} onChange={(e) => updateField("email", e.target.value)} />
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <div
              className="flex items-start gap-3 p-4 rounded-xl border-2 border-border/50 bg-card cursor-pointer hover:border-funky-gold/50 transition-colors"
              onClick={() => updateField("consent", !formData.consent)}
            >
              <div className={`mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${formData.consent ? "bg-funky-green border-funky-green" : "border-muted-foreground/40"}`}>
                {formData.consent && <CheckCircle className="w-3.5 h-3.5 text-accent-foreground" />}
              </div>
              <p className="text-sm font-body text-foreground leading-relaxed">
                I agree to receive my moving quotes and understand my details will be used to generate discounted quotes via our partner{" "}
                <span className="font-semibold text-funky-orange">(AnyVan)</span>.
              </p>
            </div>
            <div className="bg-funky-green/10 border border-funky-green/30 rounded-xl p-3 text-center">
              <p className="text-xs font-body text-funky-green font-semibold">🎉 AnyVan partners give you exclusive discounted rates on your move!</p>
            </div>
          </div>
        );
    }
  };

  const renderAudioMode = () => (
    <div className="space-y-5">
      {/* Instructions */}
      <div className="bg-primary/5 border border-primary/15 rounded-xl p-4">
        <p className="font-body font-semibold text-foreground text-sm mb-2">🎙️ Please say:</p>
        <ul className="text-sm font-body text-muted-foreground space-y-1 list-disc list-inside">
          <li>Your moving postcode</li>
          <li>Where you're moving to</li>
          <li>Property type</li>
          <li>Number of bedrooms</li>
          <li>Floor level and lift (if any)</li>
          <li>Your moving date</li>
        </ul>
        <div className="mt-3 bg-card border border-border/50 rounded-lg p-3">
          <p className="text-xs font-body text-muted-foreground italic">
            <span className="font-semibold not-italic">Example:</span> "I'm moving from BD1 to M14, 2 bed flat, 2nd floor, no lift, moving on April 10th"
          </p>
        </div>
      </div>

      {/* Recording UI */}
      <div className="flex flex-col items-center gap-4">
        {isRecording && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="text-3xl font-display text-accent tabular-nums">{formatTime(recordingTime)}</div>
            <div className="w-48 h-2 bg-muted rounded-full mt-2 overflow-hidden">
              <motion.div
                className="h-full bg-accent rounded-full"
                style={{ width: `${(recordingTime / MAX_RECORDING_TIME) * 100}%` }}
              />
            </div>
            <p className="text-xs font-body text-muted-foreground mt-1">Max {MAX_RECORDING_TIME}s</p>
          </motion.div>
        )}

        <motion.button
          type="button"
          onClick={isRecording ? stopRecording : startRecording}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={isRecording ? { boxShadow: ["0 0 0 0 hsl(4 85% 55% / 0.4)", "0 0 0 16px hsl(4 85% 55% / 0)"] } : {}}
          transition={isRecording ? { duration: 1.5, repeat: Infinity } : {}}
          className={`w-20 h-20 rounded-full flex items-center justify-center transition-colors ${
            isRecording ? "bg-accent text-accent-foreground" : "bg-funky-orange text-accent-foreground"
          }`}
        >
          {isRecording ? <Square className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
        </motion.button>
        <p className="text-sm font-body text-muted-foreground">{isRecording ? "Tap to stop recording" : "Tap to start recording"}</p>

        {audioUrl && !isRecording && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm">
            <audio controls src={audioUrl} className="w-full rounded-lg" />
            <p className="text-xs font-body text-funky-green text-center mt-1.5 font-semibold">✅ Recording saved! Now fill in your contact details below.</p>
          </motion.div>
        )}
      </div>

      {/* Contact fields for audio mode */}
      {audioUrl && !isRecording && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3 border-t border-border/30 pt-4">
          <div>
            <label className="block text-sm font-body font-semibold text-foreground mb-1.5">Full Name</label>
            <input className="input-funky w-full" placeholder="Your full name" value={formData.fullName} onChange={(e) => updateField("fullName", e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-body font-semibold text-foreground mb-1.5">Email Address</label>
            <input type="email" className="input-funky w-full" placeholder="your@email.com" value={formData.email} onChange={(e) => updateField("email", e.target.value)} />
          </div>
          <div
            className="flex items-start gap-3 p-4 rounded-xl border-2 border-border/50 bg-card cursor-pointer hover:border-funky-gold/50 transition-colors"
            onClick={() => updateField("consent", !formData.consent)}
          >
            <div className={`mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${formData.consent ? "bg-funky-green border-funky-green" : "border-muted-foreground/40"}`}>
              {formData.consent && <CheckCircle className="w-3.5 h-3.5 text-accent-foreground" />}
            </div>
            <p className="text-sm font-body text-foreground leading-relaxed">
              I agree to receive my moving quotes via our partner <span className="font-semibold text-funky-orange">(AnyVan)</span>.
            </p>
          </div>
          <motion.button
            type="button"
            onClick={handleSubmit}
            disabled={!formData.fullName || !formData.email || !formData.consent}
            className="btn-funky w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            Get My Discounted Moving Quotes! <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      )}
    </div>
  );

  return (
    <section className="py-10 md:py-14 bg-background bg-dotted" id="quote-form">
      <div className="container mx-auto px-4 max-w-xl">
        {/* Urgency banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-3"
        >
          <span className="inline-flex items-center gap-2 bg-funky-green/15 text-funky-green font-body text-xs sm:text-sm font-semibold px-3 sm:px-4 py-1.5 rounded-full border border-funky-green/30">
            <CheckCircle className="w-4 h-4 shrink-0" />
            Over 10,000 moves completed — Join them today!
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-2xl sm:text-3xl md:text-4xl font-display text-center mb-2"
        >
          <span className="star-deco mr-1">✦</span>
          Get Your <span className="text-accent">Discounted</span> Quote
          <span className="star-deco ml-1">✦</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="text-center text-muted-foreground font-body text-xs sm:text-sm mb-4"
        >
          No obligation • No hidden fees • Powered by{" "}
          <span className="font-semibold text-funky-orange">AnyVan</span> for exclusive discounts
        </motion.p>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-5"
        >
          {trustPoints.map((tp, i) => (
            <div key={i} className="flex items-center gap-1.5 text-[11px] sm:text-xs font-body text-muted-foreground bg-card border border-border/50 rounded-full px-2.5 sm:px-3 py-1.5">
              <tp.icon className="w-3.5 h-3.5 text-funky-green shrink-0" />
              {tp.text}
            </div>
          ))}
        </motion.div>

        {/* Mode toggle */}
        <div className="flex justify-center mb-4">
          <div className="inline-flex bg-muted rounded-full p-1 gap-1">
            <button
              onClick={() => setMode("form")}
              className={`px-4 py-2 rounded-full text-sm font-body font-medium transition-all ${
                mode === "form" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
              }`}
            >
              📝 Fill Form
            </button>
            <button
              onClick={() => setMode("audio")}
              className={`px-4 py-2 rounded-full text-sm font-body font-medium transition-all ${
                mode === "audio" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
              }`}
            >
              🎤 Record Audio
            </button>
          </div>
        </div>

        {/* Main form card */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="card-poster p-5 sm:p-6 md:p-8"
        >
          {mode === "form" ? (
            <>
              {/* Step indicator */}
              <div className="flex items-center justify-between mb-6 gap-1">
                {STEPS.map((s, i) => {
                  const Icon = s.icon;
                  const isActive = i === step;
                  const isDone = i < step;
                  return (
                    <div key={i} className="flex flex-col items-center flex-1 min-w-0">
                      <div
                        className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-xs font-body font-bold transition-all ${
                          isActive
                            ? "bg-funky-orange text-accent-foreground scale-110 shadow-lg"
                            : isDone
                            ? "bg-funky-green text-accent-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {isDone ? <CheckCircle className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                      </div>
                      <span className={`text-[9px] sm:text-[10px] font-body mt-1 text-center leading-tight ${isActive ? "text-foreground font-semibold" : "text-muted-foreground"}`}>
                        {s.label}
                      </span>
                      {i < STEPS.length - 1 && (
                        <div className="hidden" />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Progress bar */}
              <div className="w-full h-1.5 bg-muted rounded-full mb-5 overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-funky-orange to-accent"
                  initial={false}
                  animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </div>

              {/* Step title */}
              <h3 className="font-display text-lg sm:text-xl text-foreground mb-4">
                Step {step + 1}: {STEPS[step].label}
              </h3>

              {/* Step content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderStep()}
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-border/30">
                <button
                  type="button"
                  onClick={() => setStep((s) => s - 1)}
                  disabled={step === 0}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full font-body text-sm font-medium text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>

                {step < STEPS.length - 1 ? (
                  <motion.button
                    type="button"
                    onClick={() => setStep((s) => s + 1)}
                    disabled={!canAdvance()}
                    className="btn-funky flex items-center gap-2 text-sm !px-5 !py-2.5 disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={canAdvance() ? { scale: 1.03 } : {}}
                    whileTap={canAdvance() ? { scale: 0.97 } : {}}
                  >
                    Next <ArrowRight className="w-4 h-4" />
                  </motion.button>
                ) : (
                  <motion.button
                    type="button"
                    onClick={handleSubmit}
                    disabled={!canAdvance()}
                    className="btn-funky flex items-center gap-2 text-sm !px-5 !py-2.5 disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={canAdvance() ? { scale: 1.03 } : {}}
                    whileTap={canAdvance() ? { scale: 0.97 } : {}}
                  >
                    Get My Discounted Moving Quotes! <ArrowRight className="w-4 h-4" />
                  </motion.button>
                )}
              </div>
            </>
          ) : (
            renderAudioMode()
          )}
        </motion.div>

        {/* Phone CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-5">
          <p className="text-muted-foreground font-body text-sm">Prefer to talk?</p>
          <motion.a
            href="tel:08001234567"
            className="inline-flex items-center gap-2 btn-gold !text-sm !px-5 !py-2"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
          >
            <Phone className="w-4 h-4" /> Call 0800 123 4567
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default QuoteForm;
