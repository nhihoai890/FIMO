import { GoogleGenerativeAI } from '@google/generative-ai';
import React, { useContext, useState } from 'react';
import { FaComment, FaPaperPlane } from 'react-icons/fa6';
import { IoMdClose } from 'react-icons/io';
import { MoviesContext } from '../../../contexts/MovieProvider';

const genAI = new GoogleGenerativeAI(
    import.meta.env.VITE_GEMINI_API_KEY
)
function ChatBox(props) {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: "assistant", content: "Xin chào tôi là trợ thủ AI!" }
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const movies = useContext(MoviesContext);
    const sendMessage = async () => {
        if (!input.trim()) return;

        const newMessages = [
            ...messages,
            { role: "user", content: input }
        ];
        console.log(newMessages);

        setMessages(newMessages);
        setInput("");
        setLoading(true);
        console.log();

        try {
            const model = genAI.getGenerativeModel({
                model: "gemini-3-flash-preview",
                contents: "Explain how AI works in a few words",
            });

            const result = await model.generateContent(
                newMessages.map(m => m.content).join("\n")
            );

            const reply = result.response.text();

            setMessages([
                ...newMessages,
                { role: "assistant", content: reply }
            ]);
        } catch (e) {
            console.error(e);
            setMessages([
                ...newMessages,
                { role: "assistant", content: "❌ Gemini không phản hồi" }
            ]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {!open && (
                <button onClick={() => setOpen(true)} className='fixed - bottom-6 right-6 bg-orange-500 text-white p-4 rounded-full z-10'>
                    <FaComment />
                </button>
            )}
            {open && (
                <div className="fixed bottom-6 right-6 w-[330px] h-[440px] bg-white rounded-xl shadow-2xl z-50 flex flex-col overflow-hidden">

                    {/* Header */}
                    <div className="flex items-center justify-between p-3 bg-orange-500 text-white">
                        <div className="flex items-center gap-2">
                            <img
                                src="https://img.freepik.com/free-photo/androgynous-avatar-non-binary-queer-person_23-2151100221.jpg?semt=ais_rp_50_assets&w=740&q=80"
                                alt="avatar"
                                className="w-8 h-8 rounded-full"
                            />
                            <div>
                                <p className="text-sm font-semibold">Support</p>
                                <p className="text-xs opacity-80">Online</p>
                            </div>
                        </div>

                        <button onClick={() => setOpen(false)}>
                            <IoMdClose size={22} />
                        </button>
                    </div>

                    {/* Message area */}
                    <div className="flex-1 p-3 overflow-y-auto space-y-3 bg-gray-50">

                        {/* Message from support */}
                        {messages.map((mes, i) => (
                            <div
                                key={i}
                                className={`flex ${mes.role === "user" ? "justify-end" : "justify-start"}`}
                            >
                                {mes.role !== "user" && (
                                    <img
                                        src="https://img.freepik.com/free-photo/androgynous-avatar-non-binary-queer-person_23-2151100221.jpg?semt=ais_rp_50_assets&w=740&q=80"
                                        className="w-7 h-7 rounded-full mr-2"
                                    />
                                )}

                                <div
                                    className={`p-2 rounded-lg shadow text-sm max-w-[70%] ${mes.role === "user"
                                            ? "bg-orange-500 text-white"
                                            : "bg-white text-black"
                                        }`}
                                >
                                    {mes.content}
                                </div>
                            </div>
                        ))}

                        {loading && (
                            <div className="flex items-start gap-2">
                                <img
                                    src="https://img.freepik.com/free-photo/androgynous-avatar-non-binary-queer-person_23-2151100221.jpg?semt=ais_rp_50_assets&w=740&q=80"
                                    className="w-7 h-7 rounded-full"
                                />
                                <div className="bg-white text-black p-2 rounded-lg shadow text-sm">
                                    AI đang trả lời...
                                </div>
                            </div>
                        )}

                    </div>

                    {/* Input */}
                    <div className="border-t p-2 flex items-center gap-2">
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                            className="flex-1 border text-black rounded-full px-3 py-2 text-sm focus:outline-none"
                            placeholder="Nhập tin nhắn..."
                        />

                        <button onClick={sendMessage} className="bg-orange-500 text-white p-2 rounded-full">
                            <FaPaperPlane size={14} />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default ChatBox;