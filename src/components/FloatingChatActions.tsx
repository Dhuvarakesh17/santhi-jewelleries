import { FormEvent, useMemo, useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

type Sender = "bot" | "user";

interface ChatMessage {
  id: number;
  sender: Sender;
  text: string;
}

const phoneNumber = "919443211809";
const defaultWhatsAppMessage =
  "Hi Santhi Jewellers, I would like to know more details.";

const initialMessages: ChatMessage[] = [
  {
    id: 1,
    sender: "bot",
    text: "Welcome to Santhi Jewellers. How can we help you today?",
  },
];

const getBotReply = (message: string) => {
  const query = message.toLowerCase();

  if (
    query.includes("price") ||
    query.includes("rate") ||
    query.includes("gold")
  ) {
    return "You can check the latest gold rate in the ticker at the top of this page. For exact making charges, contact us on WhatsApp.";
  }

  if (
    query.includes("custom") ||
    query.includes("design") ||
    query.includes("order")
  ) {
    return "Yes, we do customized jewellery. Share your idea on WhatsApp and our team will guide you.";
  }

  if (query.includes("delivery") || query.includes("shipping")) {
    return "We support shipping across India. Delivery timelines depend on product availability and location.";
  }

  if (
    query.includes("location") ||
    query.includes("address") ||
    query.includes("store")
  ) {
    return "Our head office is in Karaikudi, Tamil Nadu. You can also call us at +91 94432 11809.";
  }

  if (
    query.includes("contact") ||
    query.includes("phone") ||
    query.includes("call")
  ) {
    return "You can reach us at +91 94432 11809 or tap the WhatsApp button for a quick response.";
  }

  return "Thanks for your message. Please share more details, or use WhatsApp for a faster response from our team.";
};

const FloatingChatActions = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);

  const quickQuestions = useMemo(
    () => [
      "Latest gold rate?",
      "Do you make custom designs?",
      "Store location",
    ],
    [],
  );

  const openWhatsApp = () => {
    const encodedMessage = encodeURIComponent(defaultWhatsAppMessage);
    const desktopProtocolUrl = `whatsapp://send?phone=${phoneNumber}&text=${encodedMessage}`;
    const webUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    const isMobileDevice = /Android|iPhone|iPad|iPod|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    );

    if (isMobileDevice) {
      window.open(webUrl, "_blank", "noopener,noreferrer");
      return;
    }

    window.open(desktopProtocolUrl, "_blank", "noopener,noreferrer");

    window.setTimeout(() => {
      if (document.visibilityState === "visible") {
        window.open(webUrl, "_blank", "noopener,noreferrer");
      }
    }, 900);
  };

  const pushMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMessage: ChatMessage = {
      id: Date.now(),
      sender: "user",
      text: trimmed,
    };

    const botMessage: ChatMessage = {
      id: Date.now() + 1,
      sender: "bot",
      text: getBotReply(trimmed),
    };

    setMessages((prev) => [...prev, userMessage, botMessage]);
    setInput("");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    pushMessage(input);
  };

  return (
    <div className="fixed bottom-4 right-4 z-90 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {isChatOpen && (
        <div className="w-[calc(100vw-2rem)] max-w-90 rounded-2xl border border-[#8BA2D4]/30 bg-white shadow-[0_16px_45px_rgba(0,0,0,0.22)] overflow-hidden">
          <div className="bg-linear-to-r from-[#5C6B8E] to-[#8BA2D4] px-4 py-3 text-white">
            <p className="text-[11px] uppercase tracking-[0.18em] font-semibold">
              Santhi Assistant
            </p>
            <p className="text-sm text-white/85">
              Ask about rates, custom orders or delivery
            </p>
          </div>

          <div className="h-72 overflow-y-auto bg-[#F7FAFF] px-3 py-3 custom-scrollbar">
            <div className="space-y-2.5">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`max-w-[88%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                    message.sender === "user"
                      ? "ml-auto bg-[#6E83B7] text-white"
                      : "mr-auto bg-[#E8F1FF] text-[#334567]"
                  }`}
                >
                  {message.text}
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-[#8BA2D4]/25 bg-white p-3">
            <div className="mb-2 flex flex-wrap gap-2">
              {quickQuestions.map((question) => (
                <button
                  key={question}
                  type="button"
                  onClick={() => pushMessage(question)}
                  className="rounded-full border border-[#8BA2D4]/35 px-2.5 py-1 text-[11px] font-medium text-[#5C6B8E] transition hover:bg-[#6E83B7] hover:text-white"
                >
                  {question}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Type your message..."
                className="h-10 w-full rounded-full border border-[#8BA2D4]/35 px-4 text-sm outline-none transition focus:border-[#6E83B7]"
              />
              <button
                type="submit"
                aria-label="Send message"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#6E83B7] text-white transition hover:bg-[#5C6B8E]"
              >
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={openWhatsApp}
        aria-label="Open WhatsApp"
        className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_24px_rgba(37,211,102,0.45)] transition hover:scale-[1.04]"
      >
        <FaWhatsapp size={30} aria-hidden="true" />
      </button>

      <button
        type="button"
        onClick={() => setIsChatOpen((prev) => !prev)}
        aria-label={isChatOpen ? "Close chatbot" : "Open chatbot"}
        className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#8BA2D4] text-white shadow-[0_12px_24px_rgba(139,162,212,0.5)] transition hover:scale-[1.04] hover:bg-[#5C6B8E]"
      >
        {isChatOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </div>
  );
};

export default FloatingChatActions;
