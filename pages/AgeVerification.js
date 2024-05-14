import React, { useState, useEffect } from "react";
import styles from "./AgeVerification.module.css";

const AgeVerification = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const isOver18 = localStorage.getItem("isOver18");
    if (isOver18) {
      setIsVisible(false);
    }
  }, []);

  const handleConfirm = () => {
    localStorage.setItem("isOver18", "true");
    setIsVisible(false); // Hide the overlay on confirmation
  };

  const handleDeny = () => {
    setShowMessage(true);
  };

  // Check for storage on every render (optional)
  useEffect(() => {
    const isOver18 = localStorage.getItem("isOver18");
    if (!isOver18) {
      // If no storage, show the overlay
      setIsVisible(true);
    }
  }, []);

  // Clear storage on tab close (or window close)
  useEffect(() => {
    const handleStorage = () => {
      localStorage.removeItem("isOver18");
    };

    window.addEventListener("beforeunload", handleStorage); // Clear on close

    return () => window.removeEventListener("beforeunload", handleStorage); // Cleanup
  }, []);

  return (
    <>
      {isVisible && (
        <div className={styles.overlayVisible}>
          <div className={styles.overlayContent}>
            <div className="">
              {!showMessage && (
                <> 
                  <h2 className={styles.age_varification}>Are you over 18 years old?</h2>
                  <p className={styles.age_vari_des}>The content of this website cannot be shown unless you verify your age.Please 
                    verify that you are over 18 to see this page.</p>
                  <button onClick={handleConfirm} className={styles.agreebtn}>I'M OVER 18</button>
                  <button onClick={handleDeny} className={styles.agreebtn}>EXIT</button>
                </>
              )}
              {showMessage && (
                <p className={styles.message}>Please visit when you are 18</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AgeVerification;
