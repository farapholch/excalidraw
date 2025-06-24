import React, { useEffect, useState } from "react";

type Props = {
  portal: { roomId?: string };
};

const RoomEndTime: React.FC<Props> = ({ portal }) => {
  const [endsAt, setEndsAt] = useState<string | null>(null);

  useEffect(() => {
    const roomId = portal?.roomId;
    const backendUrl = import.meta.env.VITE_APP_HTTP_STORAGE_BACKEND_URL;

    if (!roomId || !backendUrl) return;

    const fetchMetadata = async () => {
      try {
        const res = await fetch(`${backendUrl}/rooms/${roomId}/metadata`);
        if (!res.ok) {
          console.warn("Kunde inte hämta metadata för rum:", res.statusText);
          return;
        }

        const data = await res.json();

        if (data.ends_at) {
          // Konvertera till lokal svensk tid (UTC+2 sommartid eller +1 vintertid)
          const endsAtDate = new Date(data.ends_at);
          const formatted = endsAtDate.toLocaleString("sv-SE", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          });
          setEndsAt(formatted);
        }
      } catch (error) {
        console.error("Fel vid hämtning av metadata:", error);
      }
    };

    fetchMetadata();
  }, [portal?.roomId]);

  if (!endsAt) return null;

  return <span style={{ fontSize: "0.8em", color: "#888" }}>Slutar: {endsAt}</span>;
};

export default RoomEndTime;
