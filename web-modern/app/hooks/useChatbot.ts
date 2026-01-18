"use client";

import { useState, useRef, useEffect } from "react";

type Message = {
    text: string;
    sender: "user" | "bot";
};

type ChatState = "MENU" | "DETAILS" | "EMAIL" | "DONE";

export function useChatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { text: "¡Hola! Soy el asistente virtual de Contenedores Benja. Selecciona un servicio para comenzar:", sender: "bot" }
    ]);
    const [chatState, setChatState] = useState<ChatState>("MENU");
    const [service, setService] = useState("");
    const [details, setDetails] = useState("");
    const [inputEnabled, setInputEnabled] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, chatState]);

    const toggleChat = () => setIsOpen(!isOpen);

    const handleOptionSelect = (option: string, type: string) => {
        setMessages(prev => [...prev, { text: option, sender: "user" }]);
        setChatState("DETAILS");
        setService(option);

        setTimeout(() => {
            let question = "";
            switch (type) {
                case 'bateas': question = "Perfecto. Disponemos de varios tamaños. ¿Para qué tipo de residuos la necesitas y en qué zona?"; break;
                case 'aridos': question = "Entendido. ¿Qué tipo de material (arena, piedra, tierra) y cantidad aproximada necesitas?"; break;
                case 'maquinaria': question = "Excelente. ¿Para qué tipo de trabajo necesitas la máquina (limpieza, movimiento de suelo, carga)?"; break;
                case 'consultas': question = "¿En qué podemos ayudarte? Cuéntanos tu duda puntualmente."; break;
                default: question = "¿Podrías darnos más detalles?";
            }
            setMessages(prev => [...prev, { text: question, sender: "bot" }]);
            setInputEnabled(true);
        }, 600);
    };

    const handleInputSubmit = (text: string) => {
        setMessages(prev => [...prev, { text, sender: "user" }]);
        setInputEnabled(false);

        setTimeout(() => {
            if (chatState === "DETAILS") {
                setDetails(text);
                setChatState("EMAIL");
                setMessages(prev => [...prev, { text: "¡Gracias! Por favor, déjanos tu correo electrónico o email para enviarte la información completa.", sender: "bot" }]);
                setInputEnabled(true);
            } else if (chatState === "EMAIL") {
                setChatState("DONE");
                // Here you would send data to backend
                setMessages(prev => [
                    ...prev,
                    { text: `¡Perfecto! Hemos registrado tu solicitud para <b>${service}</b>.`, sender: "bot" },
                    { text: `Un asesor te contactará a la brevedad a ${text}. ¡Gracias por elegirnos!`, sender: "bot" }
                ]);

                setTimeout(() => {
                    setMessages(prev => [...prev, { text: "¿Deseas realizar otra consulta?", sender: "bot" }]);
                    setChatState("MENU");
                }, 3000);
            }
        }, 800);
    };

    return {
        isOpen,
        toggleChat,
        messages,
        chatState,
        inputEnabled,
        handleOptionSelect,
        handleInputSubmit,
        scrollRef
    };
}
