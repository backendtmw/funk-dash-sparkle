import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Mic,
  ShieldCheck,
  Clock,
  CheckCircle,
  MapPin,
  Home,
  Calendar,
  User,
  FileCheck,
  Square,
  Phone,
  PartyPopper,
  Plus,
  Minus,
  ChevronDown,
  ChevronUp,
  Package,
} from "lucide-react";
import { useState, useRef, useCallback, useEffect } from "react";

const trustPoints = [
  { icon: ShieldCheck, text: "Insured house move specialists" },
  { icon: Clock, text: "Same-day setup" },
  { icon: CheckCircle, text: "£25+ discount" },
];

const STEPS = [
  { label: "Move Details", icon: MapPin },
  { label: "Your Items", icon: Package },
  { label: "Move Date", icon: Calendar },
  { label: "Contact", icon: User },
  { label: "Consent", icon: FileCheck },
];

// Room-based inventory
const INVENTORY_ROOMS = [
  {
    name: "Bedrooms",
    emoji: "🛏️",
    items: [
      "Single Bed & Mattress",
      "Double Bed & Mattress",
      "Kingsize Bed & Mattress",
      "Single Wardrobe",
      "Double Wardrobe",
      "Chest Of Drawers",
      "Bedside Table",
      "Dressing Table",
      "Television",
    ],
  },
  {
    name: "Living",
    emoji: "🛋️",
    items: [
      "Two Seater Sofa",
      "Three Seater Sofa",
      "Armchair",
      "Coffee Table",
      "Side Table",
      "Small Television/TV (Less than 30\")",
      "Large Television/TV (Greater than 40\")",
      "TV Stand",
      "Bookcase",
      "Rug",
      "Desk",
      "Office Chair",
      "Artwork",
      "Floor Lamp",
    ],
  },
  {
    name: "Dining",
    emoji: "🍽️",
    items: [
      "4 Seater Dining Table",
      "6 Seater Dining Table",
      "Dining Chair",
      "Sideboard",
      "Display Cabinet",
      "Rug",
    ],
  },
  {
    name: "Kitchen",
    emoji: "🍳",
    items: [
      "Fridge Freezer",
      "Washing Machine",
      "Microwave Oven",
      "Cooker",
      "Dishwasher",
      "Kitchen Table",
      "Dining Chair",
      "Bin",
      "Ironing Board",
      "Tumble Dryer",
    ],
  },
  {
    name: "Bathroom",
    emoji: "🚿",
    items: [
      "Large Mirror",
      "Small Mirror",
      "Rug",
      "Bathroom Cabinet",
      "Bath Tub",
    ],
  },
  {
    name: "Garden",
    emoji: "🌿",
    items: [
      "Garden Table",
      "Garden Chair",
      "Lawn Mower",
      "Tool Box",
      "Bench",
      "Parasol",
      "Bicycle",
    ],
  },
  {
    name: "Boxes & Packaging",
    emoji: "📦",
    items: [
      "Large Box (50×50×50 cm)",
      "Medium Box (45×45×35 cm)",
      "Small Box (40×30×30 cm)",
      "Wardrobe Box",
      "Suitcase",
      "Bag",
    ],
  },
];

type FormData = {
  fromPostcode: string;
  toPostcode: string;
  propertyType: string;
  floorLevel: string;
  liftAvailable: string;
  bedrooms: string;
  moveDate: string;
  flexibleDates: string;
  fullName: string;
  email: string;
  phone: string;
  consent: boolean;
  otherItems: string;
};

type InventoryItems = Record<string, number>;

const initialFormData: FormData = {
  fromPostcode: "",
  toPostcode: "",
  propertyType: "",
  floorLevel: "",
  liftAvailable: "",
  bedrooms: "",
  moveDate: "",
  flexibleDates: "",
  fullName: "",
  email: "",
  phone: "",
  consent: false,
  otherItems: "",
};

const QuoteForm = () => {
  const [mode, setMode] = useState<"form" | "audio">("form");
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [inventory, setInventory] = useState<InventoryItems>({});
  const [expandedRooms, setExpandedRooms] = useState<Record<string, boolean>>({ Bedrooms: true });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

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

  const updateInventoryItem = (item: string, delta: number) => {
    setInventory((prev) => {
      const current = prev[item] || 0;
      const next = Math.max(0, current + delta);
      if (next === 0) {
        const { [item]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [item]: next };
    });
  };

  const toggleRoom = (roomName: string) => {
    setExpandedRooms((prev) => ({ ...prev, [roomName]: !prev[roomName] }));
  };

  const getRoomItemCount = (roomName: string) => {
    const room = INVENTORY_ROOMS.find((r) => r.name === roomName);
    if (!room) return 0;
    return room.items.reduce((sum, item) => sum + (inventory[`${roomName}::${item}`] || 0), 0);
  };

  const totalItemCount = Object.values(inventory).reduce((sum, v) => sum + v, 0);

  const canAdvance = (): boolean => {
    switch (step) {
      case 0:
        return !!(formData.fromPostcode && formData.toPostcode && formData.propertyType && formData.floorLevel && formData.liftAvailable && formData.bedrooms);
      case 1:
        return true; // inventory is optional
      case 2:
        return !!(formData.moveDate && formData.flexibleDates);
      case 3:
        return !!(formData.fullName && formData.email && formData.phone);
      case 4:
        return formData.consent;
      default:
        return false;
    }
  };

 const handleSubmit = async () => {
  try {
    setSubmitting(true);

    const payload = new FormData();

    payload.append("mode", mode);
    payload.append("fromPostcode", formData.fromPostcode);
    payload.append("toPostcode", formData.toPostcode);
    payload.append("propertyType", formData.propertyType);
    payload.append("floorLevel", formData.floorLevel);
    payload.append("liftAvailable", formData.liftAvailable);
    payload.append("bedrooms", formData.bedrooms);
    payload.append("moveDate", formData.moveDate);
    payload.append("flexibleDates", formData.flexibleDates);
    payload.append("fullName", formData.fullName);
    payload.append("email", formData.email);
    payload.append("phone", formData.phone);
    payload.append("consent", formData.consent ? "Yes" : "No");
    payload.append("otherItems", formData.otherItems || "");

    const inventoryList = Object.entries(inventory)
      .map(([item, qty]) => `${item.replace("::", " - ")}: ${qty}`)
      .join("\n");

    payload.append("inventory", inventoryList || "No items added");

    if (audioBlob) {
      payload.append("audio", audioBlob, "moving-quote-recording.webm");
    }

    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/send-quote`,
      {
        method: "POST",
        body: payload,
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.error || "Failed to submit quote");
    }

    setSubmitted(true);
  } catch (error) {
    console.error("Submit error:", error);
    alert("Something went wrong while submitting your quote. Please try again.");
  } finally {
    setSubmitting(false);
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

  const OptionButton = ({ selected, onClick, children }: { selected: boolean; onClick: () => void; children: React.ReactNode }) => (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      className={`px-4 py-2.5 rounded-xl font-body text-sm font-medium border-2 transition-all w-full sm:w-auto ${
        selected
          ? "border-funky-orange bg-funky-orange/10 text-foreground shadow-md"
          : "border-border/50 bg-card text-muted-foreground hover:border-funky-gold/50"
      }`}
    >
      {children}
    </motion.button>
  );

  // Success screen
  if (submitted) {
    return (
      <section className="py-12 md:py-16 bg-background bg-dotted" id="quote-form">
        <div className="container mx-auto px-4 max-w-xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="card-poster p-8 sm:p-10 text-center"
          >
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-funky-green/15 mb-6"
            >
              <PartyPopper className="w-10 h-10 text-funky-green" />
            </motion.div>
            <h2 className="font-display text-2xl sm:text-3xl text-foreground mb-4">
              Thank You! 🎉
            </h2>
            <p className="font-body text-base text-muted-foreground leading-relaxed mb-2">
              A real human will send you an email and ping you a text quoting you the best price by the end of today 😁
            </p>
            <p className="font-body text-sm text-funky-green font-semibold mt-4">
              Check your inbox & phone — your discounted quote is on its way!
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

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
              <div className="grid grid-cols-3 gap-2">
                {["Flat", "House", "Office"].map((t) => (
                  <OptionButton key={t} selected={formData.propertyType === t} onClick={() => updateField("propertyType", t)}>
                    {t}
                  </OptionButton>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-body font-semibold text-foreground mb-1.5">Number of Bedrooms</label>
              <div className="grid grid-cols-4 gap-2">
                {["1", "2", "3", "4+"].map((b) => (
                  <OptionButton key={b} selected={formData.bedrooms === b} onClick={() => updateField("bedrooms", b)}>
                    {b} Bed{b !== "1" ? "s" : ""}
                  </OptionButton>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-body font-semibold text-foreground mb-1.5">Floor Level</label>
              <div className="grid grid-cols-4 gap-2">
                {["Ground", "1st", "2nd", "3rd+"].map((f) => (
                  <OptionButton key={f} selected={formData.floorLevel === f} onClick={() => updateField("floorLevel", f)}>
                    {f}
                  </OptionButton>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-body font-semibold text-foreground mb-1.5">Lift Available?</label>
              <div className="grid grid-cols-2 gap-2">
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
          <div className="space-y-3">
            <p className="text-sm font-body text-muted-foreground mb-2">
              Go through each room and add items you need moved. This helps us give you an accurate quote.
            </p>

            {totalItemCount > 0 && (
              <div className="bg-funky-green/10 border border-funky-green/30 rounded-xl px-4 py-2 text-sm font-body text-foreground">
                <span className="font-semibold text-funky-green">{totalItemCount}</span> item{totalItemCount !== 1 ? "s" : ""} added
              </div>
            )}

            <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
              {INVENTORY_ROOMS.map((room) => {
                const roomCount = getRoomItemCount(room.name);
                const isOpen = expandedRooms[room.name];
                return (
                  <div key={room.name} className="border border-border/50 rounded-xl overflow-hidden bg-card">
                    <button
                      type="button"
                      onClick={() => toggleRoom(room.name)}
                      className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-base">{room.emoji}</span>
                        <span className="font-body font-semibold text-sm text-foreground">{room.name}</span>
                        {roomCount > 0 && (
                          <span className="bg-funky-orange/15 text-funky-orange text-xs font-bold px-2 py-0.5 rounded-full">
                            {roomCount}
                          </span>
                        )}
                      </div>
                      {isOpen ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-3 space-y-1.5 border-t border-border/30 pt-2">
                            {room.items.map((item) => {
                              const key = `${room.name}::${item}`;
                              const count = inventory[key] || 0;
                              return (
                                <div key={item} className="flex items-center justify-between py-1.5">
                                  <span className="text-sm font-body text-foreground pr-2">{item}</span>
                                  <div className="flex items-center gap-2 shrink-0">
                                    <button
                                      type="button"
                                      onClick={() => updateInventoryItem(key, -1)}
                                      disabled={count === 0}
                                      className="w-7 h-7 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground hover:bg-muted disabled:opacity-30 transition-colors"
                                    >
                                      <Minus className="w-3.5 h-3.5" />
                                    </button>
                                    <span className={`w-6 text-center text-sm font-body font-semibold ${count > 0 ? "text-funky-orange" : "text-muted-foreground"}`}>
                                      {count}
                                    </span>
                                    <button
                                      type="button"
                                      onClick={() => updateInventoryItem(key, 1)}
                                      className="w-7 h-7 rounded-full border border-funky-orange/50 bg-funky-orange/10 flex items-center justify-center text-funky-orange hover:bg-funky-orange/20 transition-colors"
                                    >
                                      <Plus className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Other items */}
            <div className="pt-2">
              <label className="block text-sm font-body font-semibold text-foreground mb-1.5">Any other items?</label>
              <textarea
                className="input-funky w-full min-h-[60px] resize-y"
                placeholder="e.g. Piano, Exercise Bike, Fish Tank..."
                value={formData.otherItems}
                onChange={(e) => updateField("otherItems", e.target.value)}
              />
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
              <div className="grid grid-cols-2 gap-2">
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
            <div>
              <label className="block text-sm font-body font-semibold text-foreground mb-1.5">Phone Number</label>
              <input type="tel" className="input-funky w-full" placeholder="07xxx xxx xxx" value={formData.phone} onChange={(e) => updateField("phone", e.target.value)} />
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
              <div>
                <p className="text-sm font-body text-foreground leading-relaxed">
                  ☑️ You agree to be connected with our trusted partner and secure at least{" "}
                  <span className="font-semibold text-funky-green">£25 off</span> your moving quote.
                </p>
                <p className="text-xs font-body text-muted-foreground mt-2 italic">
                  That's enough to cover a takeaway or two for your first night in your new home 😊
                </p>
              </div>
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
          <li>Property type (flat or house)</li>
          <li>Number of bedrooms</li>
          <li>Floor level and lift (if any)</li>
          <li>Your moving date</li>
        </ul>

        <div className="mt-3 bg-funky-orange/10 border border-funky-orange/30 rounded-lg p-3">
          <p className="text-sm font-body font-semibold text-foreground mb-2">
            📦 Please go through this list and let us know what needs adding. And include anything else.
          </p>
          <div className="space-y-2 text-xs font-body text-muted-foreground leading-relaxed">
            <p><span className="font-semibold text-foreground">🛏️ Bedrooms:</span> Single/Double/Kingsize Bed & Mattress, Single/Double Wardrobe, Chest of Drawers, Bedside Table, Dressing Table, Television</p>
            <p><span className="font-semibold text-foreground">🛋️ Living:</span> Two/Three Seater Sofa, Armchair, Coffee Table, Side Table, Small/Large TV, TV Stand, Bookcase, Rug, Desk, Office Chair, Artwork, Floor Lamp</p>
            <p><span className="font-semibold text-foreground">🍽️ Dining:</span> 4/6 Seater Dining Table, Dining Chair, Sideboard, Display Cabinet, Rug</p>
            <p><span className="font-semibold text-foreground">🍳 Kitchen:</span> Fridge Freezer, Washing Machine, Microwave, Cooker, Dishwasher, Kitchen Table, Bin, Ironing Board, Tumble Dryer</p>
            <p><span className="font-semibold text-foreground">🚿 Bathroom:</span> Large/Small Mirror, Rug, Bathroom Cabinet, Bath Tub</p>
            <p><span className="font-semibold text-foreground">🌿 Garden:</span> Garden Table & Chair, Lawn Mower, Tool Box, Bench, Parasol, Bicycle</p>
            <p><span className="font-semibold text-foreground">📦 Boxes:</span> Large Box (50×50×50cm), Medium Box (45×45×35cm), Small Box (40×30×30cm), Wardrobe Box, Suitcase, Bag</p>
          </div>
        </div>

        <div className="mt-3 bg-card border border-border/50 rounded-lg p-3">
          <p className="text-xs font-body text-muted-foreground italic">
            <span className="font-semibold not-italic">Example:</span> "I'm moving from BD1 to M14, 2 bed flat, 2nd floor, no lift, moving April 10th. I have a double bed, single wardrobe, 3 seater sofa, fridge freezer, washing machine, 5 large boxes and 3 medium boxes."
          </p>
        </div>
      </div>

      {/* Recording UI */}
      <div className="flex flex-col items-center gap-4">
        {isRecording && (
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
            <div className="text-3xl font-display text-accent tabular-nums">{formatTime(recordingTime)}</div>
            <div className="w-48 h-2 bg-muted rounded-full mt-2 overflow-hidden">
              <motion.div className="h-full bg-accent rounded-full" style={{ width: `${(recordingTime / MAX_RECORDING_TIME) * 100}%` }} />
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
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="w-full">
            <audio controls src={audioUrl} className="w-full rounded-lg" />
            <p className="text-xs font-body text-funky-green text-center mt-1.5 font-semibold">✅ Recording saved!</p>
          </motion.div>
        )}
      </div>

      {/* Mandatory contact fields + consent + submit for audio mode */}
      <div className="space-y-3 border-t border-border/30 pt-4">
        <div>
          <label className="block text-sm font-body font-semibold text-foreground mb-1.5">Email Address <span className="text-accent">*</span></label>
          <input type="email" className="input-funky w-full" placeholder="your@email.com" value={formData.email} onChange={(e) => updateField("email", e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-body font-semibold text-foreground mb-1.5">Phone Number <span className="text-accent">*</span></label>
          <input type="tel" className="input-funky w-full" placeholder="07xxx xxx xxx" value={formData.phone} onChange={(e) => updateField("phone", e.target.value)} />
        </div>
        <div
          className="flex items-start gap-3 p-4 rounded-xl border-2 border-border/50 bg-card cursor-pointer hover:border-funky-gold/50 transition-colors"
          onClick={() => updateField("consent", !formData.consent)}
        >
          <div className={`mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${formData.consent ? "bg-funky-green border-funky-green" : "border-muted-foreground/40"}`}>
            {formData.consent && <CheckCircle className="w-3.5 h-3.5 text-accent-foreground" />}
          </div>
          <div>
            <p className="text-sm font-body text-foreground leading-relaxed">
              ☑️ You agree to be connected with our trusted partner and secure at least{" "}
              <span className="font-semibold text-funky-green">£25 off</span> your moving quote.
            </p>
            <p className="text-xs font-body text-muted-foreground mt-2 italic">
              That's enough to cover a takeaway or two for your first night in your new home 😊
            </p>
          </div>
        </div>
        <motion.button
  type="button"
  onClick={handleSubmit}
  disabled={!formData.email || !formData.phone || !formData.consent || submitting}
  className="btn-funky w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
  whileHover={!submitting ? { scale: 1.02 } : {}}
  whileTap={!submitting ? { scale: 0.97 } : {}}
>
  {submitting ? "Submitting..." : "👉 Get My Discounted Moving Quotes"}
  {!submitting && <ArrowRight className="w-5 h-5" />}
</motion.button>
      </div>
    </div>
  );

  return (
    <section className="py-12 md:py-16 bg-background bg-dotted" id="quote-form">
      <div className="container mx-auto px-4 max-w-xl">
        <motion.h2
          initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-2xl sm:text-3xl md:text-4xl font-display text-center mb-3"
        >
          <span className="star-deco mr-1">✦</span>
          Get Your <span className="text-accent">Discounted</span> Quote
          <span className="star-deco ml-1">✦</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-center text-muted-foreground font-body text-sm sm:text-base mb-2"
        >
          Fill out the form or record your details — we'll handle the rest.
        </motion.p>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6"
        >
          {trustPoints.map((tp, i) => (
            <div key={i} className="flex items-center gap-1.5 text-[11px] sm:text-xs font-body text-muted-foreground bg-card border border-border/50 rounded-full px-2.5 sm:px-3 py-1.5">
              <tp.icon className="w-3.5 h-3.5 text-funky-green shrink-0" />
              {tp.text}
            </div>
          ))}
        </motion.div>

        {/* Mode toggle */}
        <div className="flex justify-center mb-5">
          <div className="inline-flex bg-muted rounded-full p-1 gap-1">
            <button
              onClick={() => setMode("form")}
              className={`px-4 py-2 rounded-full text-sm font-body font-medium transition-all ${
                mode === "form" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
              }`}
            >
              📝 Type your details
            </button>
            <button
              onClick={() => setMode("audio")}
              className={`px-4 py-2 rounded-full text-sm font-body font-medium transition-all ${
                mode === "audio" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
              }`}
            >
              🎤 Send audio
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
  disabled={!canAdvance() || submitting}
  className="btn-funky flex items-center gap-2 text-sm !px-5 !py-2.5 disabled:opacity-50 disabled:cursor-not-allowed"
  whileHover={!submitting && canAdvance() ? { scale: 1.03 } : {}}
  whileTap={!submitting && canAdvance() ? { scale: 0.97 } : {}}
>
  {submitting ? "Submitting..." : "👉 Get My Discounted Moving Quotes"}
  {!submitting && <ArrowRight className="w-4 h-4" />}
</motion.button>
                )}
              </div>
            </>
          ) : (
            renderAudioMode()
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default QuoteForm;
