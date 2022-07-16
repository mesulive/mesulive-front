import ReactGA from "react-ga4";

interface TrackPageViewParams {
  path: string;
}

interface TrackEventParams {
  category: string;
  action: string;
  value?: number;
  label?: string;
}

interface TrackStarforceSimEventParams
  extends Omit<TrackEventParams, "category"> {}

interface TrackOtherEventParams extends Omit<TrackEventParams, "category"> {}

class GAService {
  private readonly env: "development" | "production" | "test";

  constructor() {
    if (!process.env.REACT_APP_GA_TRACKING_ID) {
      throw new Error("GA_TRACKING_ID must be provided.");
    }

    this.env = process.env.NODE_ENV;
  }

  private get isProduction() {
    return this.env === "production";
  }

  public trackPageView({ path }: TrackPageViewParams) {
    const decodedPath = decodeURIComponent(path);

    if (!this.isProduction) {
      console.log(`Page Viewed: ${decodedPath}`);
      return;
    }

    ReactGA.send({ hitType: "pageview", page: decodedPath });
  }

  public pageView() {
    if (!this.isProduction) {
      console.log(`Page Viewed`);
      return;
    }

    if (this.isProduction) {
      ReactGA.send("pageview");
    }
  }

  private trackEvent(params: TrackEventParams) {
    if (!this.isProduction) {
      console.log(params);
      return;
    }

    ReactGA.event(params);
  }

  public takeStarforceSimEvent(params: TrackStarforceSimEventParams) {
    this.trackEvent({ category: "sim/starforce", ...params });
  }

  public takeOtherEvent(params: TrackOtherEventParams) {
    this.trackEvent({ category: "other", ...params });
  }
}

export const GA = new GAService();
