'use client'
import React, { useLayoutEffect, useState } from 'react'
import {
    backButton,
    settingsButton,
    viewport,
    themeParams,
    miniApp,
    initData,
    $debug,
    init as initSDK,
    closingBehavior,
    mainButton,
} from '@telegram-apps/sdk-react';
import '@telegram-apps/telegram-ui/dist/styles.css';

type TMAWrapperProps = { }

function init(debug: boolean): void {
    // Set @telegram-apps/sdk-react debug mode.
    $debug.set(debug);

    // Initialize special event handlers for Telegram Desktop, Android, iOS, etc.
    // Also, configure the package.
    initSDK();

    // Check if all required components are supported.
    if (!backButton.isSupported() || !miniApp.isSupported()) {
        throw new Error('ERR_NOT_SUPPORTED');
    }

    // Mount all components used in the project.
    miniApp.mount();
    themeParams.mount();
    backButton.mount();
    mainButton.mount()
    settingsButton.mount();
    closingBehavior.mount()
    initData.restore();

    void viewport
        .mount()
        .catch(e => {
            console.error('Something went wrong mounting the viewport', e);
        })
        .then(() => {
            viewport.bindCssVars();
        });

    // Define components-related CSS variables.
    miniApp.bindCssVars();
    themeParams.bindCssVars();
}

const TMAWrapper: React.FC<React.PropsWithChildren<TMAWrapperProps>> = ({ children }) => {

  const [initialized, setInitialized] = useState(false)

  useLayoutEffect(() => {
    init(true)
    setInitialized(true)
  }, [])

  if (!initialized) return null

  return children
}

export default TMAWrapper
