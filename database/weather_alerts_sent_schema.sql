-- Weather Alerts Sent Tracking Table
-- This table tracks when weather alerts were sent to users (for rate limiting)

CREATE TABLE IF NOT EXISTS public.weather_alerts_sent (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  alert_type TEXT NOT NULL, -- 'rain', 'high_temp', 'wind', 'frost', etc.
  weather_data JSONB, -- Store weather data that triggered the alert
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT weather_alerts_sent_pkey PRIMARY KEY (id)
);

-- Indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_weather_alerts_sent_user_id ON public.weather_alerts_sent(user_id);
CREATE INDEX IF NOT EXISTS idx_weather_alerts_sent_sent_at ON public.weather_alerts_sent(sent_at DESC);
CREATE INDEX IF NOT EXISTS idx_weather_alerts_sent_user_date ON public.weather_alerts_sent(user_id, sent_at DESC);

-- Composite index for daily limit queries
CREATE INDEX IF NOT EXISTS idx_weather_alerts_user_date ON public.weather_alerts_sent(user_id, (sent_at::date));

