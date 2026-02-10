import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import businessInfo from "../../../data/business_info.json";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const SYSTEM_PROMPT = `
Você é o assistente virtual da TechSOS (antiga Conficell), localizada em Alvalade, Lisboa.
Seu objetivo é ajudar os clientes com informações sobre reparações, preços, localização e vendas de iPhones.

Informações da Empresa:
- Nome: ${businessInfo.business_name}
- Proprietário: ${businessInfo.owner}
- Localização: ${businessInfo.location.address}, Alvalade, Lisboa.
- WhatsApp: ${businessInfo.contacts.whatsapp}
- Missão: ${businessInfo.mission}

Serviços:
${businessInfo.services.map(s => `- ${s.name}: ${s.description}`).join("\n")}

Preços de Reparação de Ecrã (LCD):
${Object.entries(businessInfo.pricing_repair_lcd).map(([m, p]) => `- ${m}: ${p}`).join("\n")}

Métodos de Pagamento:
${businessInfo.payment_methods.join(", ")}

Destaques Regionais:
${businessInfo.additional_info.points_of_interest}

Instruções:
- Seja profissional, prestativo e use um tom amigável.
- Responda sempre em Português de Portugal (pt-PT) ou Português do Brasil (pt-BR) conforme o cliente preferir, mas como a loja é em Lisboa, use termos locais (ex: "Ecrã", "Telemóvel").
- Se não souber algo, direcione o cliente para o WhatsApp: ${businessInfo.contacts.whatsapp}.
- Se perguntarem sobre preços de reparações que não estão na lista, diga que os preços variam e peça para contactarem pelo WhatsApp para orçamento gratuito.
- Mencione o Klarna como uma facilidade (Pague em 3x sem juros) sempre que fizer sentido em vendas ou reparações caras.
`;

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();
        const lastMessage = messages[messages.length - 1].text;

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const chat = model.startChat({
            history: messages.slice(0, -1).map((m: { sender: string; text: string }) => ({
                role: m.sender === "user" ? "user" : "model",
                parts: [{ text: m.text }],
            })),
            generationConfig: {
                maxOutputTokens: 500,
            },
        });

        // Add context for the current message
        const result = await chat.sendMessage([
            { text: `CONTEXTO DO SISTEMA: ${SYSTEM_PROMPT}` },
            { text: lastMessage }
        ]);

        const response = await result.response;
        const text = response.text();

        return NextResponse.json({ text });
    } catch (error) {
        console.error("Chat API Error:", error);
        return NextResponse.json(
            { error: "Erro ao processar a mensagem no backend." },
            { status: 500 }
        );
    }
}
