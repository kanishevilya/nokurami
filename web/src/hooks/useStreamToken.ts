"use client";

import { useState, useEffect, useCallback } from "react";
import { type JwtPayload, jwtDecode } from "jwt-decode";
import { toast } from "sonner";
import { v4 as uuid4 } from "uuid";
import { useGenerateStreamTokenMutation } from "@/graphql/generated/output";
import { useAuth } from "./useAuth";
import { useCurrent } from "./useCurrent";

interface StreamTokenPayload extends JwtPayload {
    name?: string;
    jti?: string;
}

export function useStreamToken(channelId: string) {
    const [token, setToken] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [identity, setIdentity] = useState<string>("");

    const { isAuthenticated } = useAuth();
    const { user } = useCurrent();

    const [generateStreamToken, { loading, error }] = useGenerateStreamTokenMutation({
        onCompleted: (data) => {
            const viewerToken = data.generateStreamToken.token;
            setToken(viewerToken);

            const decodedToken = jwtDecode<StreamTokenPayload>(viewerToken);
            setName(decodedToken.name || "");
            setIdentity(decodedToken.jti || "");
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const generateToken = useCallback(async () => {
        const userId = isAuthenticated && user ? user.id : uuid4();

        await generateStreamToken({
            variables: {
                data: {
                    userId,
                    channelId,
                },
            },
        });
    }, [generateStreamToken, isAuthenticated, user, channelId]);

    useEffect(() => {
        generateToken();
    }, [generateToken]);

    return { token, name, identity, loading, error };
}