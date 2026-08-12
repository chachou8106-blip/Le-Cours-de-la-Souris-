import { Hono } from 'hono';
import { z } from 'zod';
import { Env } from '../bindings/d1';

const chatRouter = new Hono<{ Bindings: Env }>();

// Schéma de validation pour les messages du chat
const ChatMessageSchema = z.object({
  message: z.string().min(1).max(500),
  sessionId: z.string().optional(),
});

// Envoyer un message au chatbot
chatRouter.post('/', async (c) => {
  try {
    const body = await c.req.json();
    const validatedData = ChatMessageSchema.parse(body);

    // Dans une implémentation réelle, on appellerait Workers AI ou une autre API de chat
    // Pour l'instant, on retourne une réponse mock
    const mockResponse = {
      id: Math.random().toString(36).substring(2, 9),
      message: `Je suis l'Oracle de la Souris ! Voici une réponse à votre question : "${validatedData.message}". Pour plus d'informations, consultez notre documentation.`,
      sessionId: validatedData.sessionId || Math.random().toString(36).substring(2, 9),
      timestamp: new Date().toISOString(),
    };

    return c.json({
      success: true,
      data: mockResponse,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return c.json(
        {
          success: false,
          error: 'Message invalide',
          details: error.errors,
          timestamp: new Date().toISOString(),
        },
        400
      );
    }
    return c.json(
      {
        success: false,
        error: 'Échec de l\'envoi du message',
        timestamp: new Date().toISOString(),
      },
      500
    );
  }
});

export default chatRouter;