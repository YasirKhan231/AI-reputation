"use client";

import { useState } from "react";
import Sidebar from "@/components/sidebar";
import {
  integrationsData,
  type Integration,
} from "../../../data/integrationData";
import styles from "./integration-api.module.css";

export default function IntegrationsAPI() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedIntegration, setSelectedIntegration] =
    useState<Integration | null>(null);
  const [apiKey, setApiKey] = useState("");
  const [showApiKey, setShowApiKey] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleIntegrationClick = (integration: Integration) => {
    setSelectedIntegration(integration);
    setApiKey("");
    setShowApiKey(false);
  };

  const handleCloseDrawer = () => {
    setSelectedIntegration(null);
    setApiKey("");
    setShowApiKey(false);
  };

  const handleSaveApiKey = () => {
    console.log(`Saving API key for ${selectedIntegration?.name}:`, apiKey);
    // Here you would typically save the API key
    handleCloseDrawer();
  };

  const clearApiKey = () => {
    setApiKey("");
  };

  const yourIntegrations = integrationsData.filter(
    (integration) => integration.category === "your"
  );
  const addIntegrations = integrationsData.filter(
    (integration) => integration.category === "add"
  );

  const getStatusText = (integration: Integration) => {
    if (integration.status === "connected" && integration.connectedCount) {
      return `✅ ${integration.connectedCount} CONNECTED`;
    }
    if (integration.status === "key_provided") {
      return "KEY PROVIDED";
    }
    return "";
  };

  const getDrawerTitle = (integration: Integration) => {
    if (integration.name === "Google AI Studio api key") {
      return "Google AI Studio Gemini API Key";
    }
    return `${integration.name} API Key`;
  };

  return (
    <div className={styles.integrationsContainer}>
      <Sidebar isCollapsed={sidebarCollapsed} onToggle={toggleSidebar} />
      <div
        className={`${styles.mainContent} ${
          sidebarCollapsed ? styles.collapsed : ""
        }`}
      >
        <div className={styles.pageHeader}>
          <h1>Integrations & API</h1>
        </div>

        {/* Your Integrations Section */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>YOUR INTEGRATIONS</h2>
          <div className={styles.integrationsList}>
            {yourIntegrations.map((integration) => (
              <div
                key={integration.id}
                className={styles.integrationRow}
                onClick={() => handleIntegrationClick(integration)}
              >
                <div className={styles.integrationLeft}>
                  <img
                    src={integration.icon || "/placeholder.svg"}
                    alt={integration.name}
                    className={styles.integrationIcon}
                  />
                  <span className={styles.integrationName}>
                    {integration.name}
                  </span>
                </div>
                <div className={styles.integrationStatus}>
                  {getStatusText(integration)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add Integrations Section */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>ADD INTEGRATIONS</h2>
          <div className={styles.integrationsList}>
            {addIntegrations.map((integration) => (
              <div
                key={integration.id}
                className={`${styles.integrationRow} ${styles.addIntegrationRow}`}
                onClick={() => handleIntegrationClick(integration)}
              >
                <div className={styles.integrationLeft}>
                  <img
                    src={integration.icon || "/placeholder.svg"}
                    alt={integration.name}
                    className={styles.integrationIcon}
                  />
                  <span className={styles.integrationName}>
                    {integration.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Overlay */}
      {selectedIntegration && (
        <div className={styles.overlay} onClick={handleCloseDrawer} />
      )}

      {/* Right-side Drawer */}
      {selectedIntegration && (
        <div className={styles.drawer}>
          <div className={styles.drawerHeader}>
            <div className={styles.drawerTitleSection}>
              <img
                src={selectedIntegration.icon || "/placeholder.svg"}
                alt={selectedIntegration.name}
                className={styles.drawerIcon}
              />
              <h3 className={styles.drawerTitle}>
                {getDrawerTitle(selectedIntegration)}
              </h3>
            </div>
            <button className={styles.closeButton} onClick={handleCloseDrawer}>
              ✕
            </button>
          </div>

          <div className={styles.drawerContent}>
            <label className={styles.inputLabel}>
              {selectedIntegration.name === "Google AI Studio api key"
                ? "Google AI Studio Gemini API Key"
                : `${selectedIntegration.name} API Key`}
            </label>
            <div className={styles.inputContainer}>
              <input
                type={showApiKey ? "text" : "password"}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className={styles.apiKeyInput}
                placeholder="Enter your API key"
              />
              {apiKey && (
                <button className={styles.clearButton} onClick={clearApiKey}>
                  ✕
                </button>
              )}
            </div>
            <button className={styles.saveButton} onClick={handleSaveApiKey}>
              SAVE
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
