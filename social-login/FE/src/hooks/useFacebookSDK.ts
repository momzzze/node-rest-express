import { useEffect, useState } from "react";

const useFacebookSDK = () => {
    const [sdkLoaded, setSdkLoaded] = useState(false);

    useEffect(() => {
        if (document.getElementById("facebook-jssdk")) {
            setSdkLoaded(true);
            return;
        }

        const script = document.createElement("script");
        script.id = "facebook-jssdk";
        script.src = "https://connect.facebook.net/en_US/sdk.js";
        script.async = true;
        script.defer = true;
        script.onload = () => setSdkLoaded(true); // ✅ Ensure SDK is fully loaded
        document.body.appendChild(script);

        window.fbAsyncInit = function () {
            window.FB.init({
                appId: import.meta.env.VITE_FACEBOOK_APP_ID as string,
                cookie: true,
                xfbml: true,
                version: "v18.0",
            });

            window.FB.AppEvents.logPageView();
            setSdkLoaded(true);
        };
    }, []);

    return sdkLoaded;
};

export default useFacebookSDK;
