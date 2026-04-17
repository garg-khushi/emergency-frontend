import { useState } from "react";

export default function App() {
  const [status, setStatus] = useState("");

  const sendSOS = () => {
    setStatus("Getting location...");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        setStatus("Sending alert...");

        try {
          await fetch("https://a18xohaaq2.execute-api.ap-south-1.amazonaws.com/prod/alert", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: "demo-user",
              lat,
              lng,
            }),
          });

          setStatus("🚨 Alert Sent Successfully");
        } catch (err) {
          setStatus("❌ Failed to send alert");
        }
      },
      () => {
        setStatus("❌ Location permission denied");
      }
    );
  };

  return (
    <div style={styles.container}>
      <h1>🚨 Emergency SOS</h1>

      <button style={styles.button} onClick={sendSOS}>
        SEND SOS
      </button>

      <p>{status}</p>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Arial",
  },
  button: {
    padding: "20px 40px",
    fontSize: "20px",
    backgroundColor: "red",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
  },
};