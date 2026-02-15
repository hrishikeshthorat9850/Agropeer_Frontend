"use client";
import { useState, useEffect, useMemo, useCallback } from "react";
import SmartFarmSidebar from "./SmartFarmSidebar";
import SmartFarmHeader from "./SmartFarmHeader";
import PestAlertCard from "./PestAlertCard";
import IrrigationCard from "./IrrigationCard";
import ProductionCard from "./ProductionCard";
import FieldMonitoringCard from "./FieldMonitoringCard";
import ProductionChartCard from "./ProductionChartCard";
import TasksAlertsCard from "./TasksAlertsCard";
import PestDetailModal from "./PestDetailModal";
import IrrigationDetailModal from "./IrrigationDetailModal";
import TaskDetailModal from "./TaskDetailModal";
import { useBackPress } from "@/Context/BackHandlerContext";

export default function SmartFarmDashboard() {
  const [activeView, setActiveView] = useState("Dashboard");
  const [selectedPest, setSelectedPest] = useState(null);
  const [selectedIrrigation, setSelectedIrrigation] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);

  useBackPress(
    () => {
      if (selectedPest || selectedIrrigation || selectedTask) {
        setSelectedPest(null);
        setSelectedIrrigation(null);
        setSelectedTask(null);
        return true;
      }
      return false;
    },
    20,
    !!(selectedPest || selectedIrrigation || selectedTask),
  );
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  const fetchInsights = useCallback(async () => {
    setRefreshing(true);
    try {
      const response = await fetch(
        `${BASE_URL}/api/smart-farm/insights?farmerId=agrogram-alpha`,
        {
          cache: "no-store",
        },
      );
      if (!response.ok) {
        throw new Error("Unable to sync with smart farm services");
      }
      const payload = await response.json();
      setData(payload);
      setError(null);
    } catch (err) {
      setError(err.message || "Unexpected error occurred");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchInsights();
  }, [fetchInsights]);

  const fields = data?.fields || [];
  const irrigation = data?.irrigation || {
    needed: [],
    usage: {},
    schedule: [],
  };
  const weather = data?.telemetry?.weather;
  const pestAlerts = data?.pests || [];
  const kpis = data?.kpis || {};

  const timeline = useMemo(() => {
    if (!data) return [];
    const events = [];
    (data.irrigation?.schedule || []).forEach((slot) =>
      events.push({
        type: "irrigation",
        label: `${slot.field} · ${slot.window}`,
      }),
    );
    (data.pests || []).forEach((alert) =>
      events.push({
        type: "pest",
        label: `${alert.pathogen} · ${alert.location}`,
      }),
    );
    (data.tasks || []).forEach((task) =>
      events.push({ type: "task", label: `${task.text} · ${task.dueDate}` }),
    );
    return events.slice(0, 6);
  }, [data]);

  const badgeTheme = {
    irrigation: "bg-emerald-100 text-emerald-700",
    pest: "bg-rose-100 text-rose-700",
    task: "bg-indigo-100 text-indigo-700",
  };

  const renderKpiSkeleton = () =>
    Array.from({ length: 4 }).map((_, index) => (
      <div
        key={index}
        className="bg-white/60 rounded-2xl p-4 animate-pulse h-28"
      />
    ));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50 flex">
      <SmartFarmSidebar activeView={activeView} setActiveView={setActiveView} />

      <div className="flex-1 flex flex-col">
        <SmartFarmHeader
          meta={data?.meta}
          refreshing={refreshing}
          onRefresh={fetchInsights}
        />

        <div className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
                {error}
              </div>
            )}

            <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              {loading && renderKpiSkeleton()}
              {!loading && (
                <>
                  <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                    <p className="text-xs uppercase text-gray-400">
                      Productivity index
                    </p>
                    <p className="text-3xl font-semibold text-gray-900">
                      {kpis.productivityIndex ?? "—"}%
                    </p>
                    <p className="text-xs text-gray-500 mt-1">vs last week</p>
                  </div>
                  <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                    <p className="text-xs uppercase text-gray-400">
                      Soil moisture avg
                    </p>
                    <p className="text-3xl font-semibold text-gray-900">
                      {kpis.soilMoistureAvg ?? "—"}%
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Across {fields.length} fields
                    </p>
                  </div>
                  <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                    <p className="text-xs uppercase text-gray-400">
                      Evapotranspiration
                    </p>
                    <p className="text-3xl font-semibold text-gray-900">
                      {kpis.evapotranspiration ?? "—"} mm
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      micro-meteorology
                    </p>
                  </div>
                  <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                    <p className="text-xs uppercase text-gray-400">
                      Stress alerts
                    </p>
                    <p className="text-3xl font-semibold text-gray-900">
                      {kpis.stressAlerts ?? "—"}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Need attention</p>
                  </div>
                </>
              )}
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {(pestAlerts.length ? pestAlerts : Array.from({ length: 2 }))
                .slice(0, 2)
                .map((alert, index) => (
                  <PestAlertCard
                    key={alert?.id || index}
                    alert={
                      alert || {
                        crop: "Loading crop",
                        severity: "Elevated",
                        probability: 0,
                        location: "—",
                        pathogen: "Processing",
                        recommendedActions: [],
                      }
                    }
                    onClick={() => alert && setSelectedPest(alert)}
                  />
                ))}
              <IrrigationCard
                variant="needed"
                data={{ list: irrigation.needed }}
                onClick={setSelectedIrrigation}
              />
              <IrrigationCard
                variant="usage"
                data={irrigation.usage}
                onClick={setSelectedIrrigation}
              />
              <IrrigationCard
                variant="schedule"
                data={{ schedule: irrigation.schedule }}
                onClick={setSelectedIrrigation}
              />
            </section>

            <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <ProductionCard data={data?.production} />
              {fields[0] ? (
                <FieldMonitoringCard field={fields[0]} weather={weather} />
              ) : (
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 flex flex-col justify-center">
                  <p className="text-gray-800 font-semibold">
                    No field telemetry yet
                  </p>
                  <p className="text-sm text-gray-500">
                    Connect a soil probe to unlock insights.
                  </p>
                </div>
              )}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-gray-800 font-semibold mb-2">
                  Telemetry Snapshot
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  Quantum sensor mesh
                </p>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs uppercase text-gray-400">Temp</p>
                    <p className="text-xl font-semibold">
                      {weather?.temperature ?? "—"}°C
                    </p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs uppercase text-gray-400">Humidity</p>
                    <p className="text-xl font-semibold">
                      {weather?.humidity ?? "—"}%
                    </p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs uppercase text-gray-400">
                      Solar flux
                    </p>
                    <p className="text-xl font-semibold">
                      {weather?.solarRadiation ?? "—"} W/m²
                    </p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs uppercase text-gray-400">Anomalies</p>
                    <p className="text-xl font-semibold">
                      {data?.telemetry?.anomalies ?? 0}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2">
                <ProductionChartCard
                  series={data?.production?.trend}
                  projected={data?.production?.projected}
                />
              </div>
              <TasksAlertsCard
                tasks={data?.tasks}
                onTaskClick={setSelectedTask}
              />
            </section>

            <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-gray-800 font-semibold">
                      Digital Field Mosaic
                    </h3>
                    <p className="text-sm text-gray-500">
                      Live NDVI + hydration pulse
                    </p>
                  </div>
                  <span className="text-xs text-gray-400 uppercase">
                    {fields.length} parcels
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {fields.map((field) => (
                    <div
                      key={field.id}
                      className="border border-gray-100 rounded-xl p-4 hover:shadow-md transition"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-500">{field.stage}</p>
                          <p className="text-lg font-semibold text-gray-900">
                            {field.name}
                          </p>
                        </div>
                        <span className="text-2xl">{field.icon || "🌱"}</span>
                      </div>
                      <div className="mt-3 text-sm text-gray-600">
                        <p>Moisture {field.soilMoisture}%</p>
                        <p>NDVI {field.ndvi}</p>
                        <p>Stress {field.stress}</p>
                      </div>
                    </div>
                  ))}
                  {fields.length === 0 && (
                    <p className="text-sm text-gray-500">
                      No field telemetry yet.
                    </p>
                  )}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-800 font-semibold">
                    NeuroMesh Timeline
                  </h3>
                  <span className="text-xs text-gray-400 uppercase">
                    live sync
                  </span>
                </div>
                <div className="space-y-3">
                  {timeline.map((event, index) => (
                    <div
                      key={`${event.type}-${index}`}
                      className="flex items-center gap-3"
                    >
                      <span
                        className={`text-xs px-3 py-1 rounded-full ${
                          badgeTheme[event.type]
                        }`}
                      >
                        {event.type}
                      </span>
                      <p className="text-sm text-gray-700">{event.label}</p>
                    </div>
                  ))}
                  {timeline.length === 0 && (
                    <p className="text-sm text-gray-500">No live events yet.</p>
                  )}
                </div>
              </div>
            </section>

            <section className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-gray-800 font-semibold mb-4">
                Adaptive Recommendations
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(data?.recommendations || []).map((rec) => (
                  <div
                    key={rec.id}
                    className="border border-emerald-100 rounded-xl p-4"
                  >
                    <p className="text-xs uppercase text-emerald-600 mb-1">
                      {rec.impact}
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      {rec.title}
                    </p>
                    <p className="text-sm text-gray-600 mt-2">{rec.summary}</p>
                  </div>
                ))}
                {(!data?.recommendations ||
                  data.recommendations.length === 0) && (
                  <p className="text-sm text-gray-500">
                    No AI nudges right now.
                  </p>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>

      {selectedPest && (
        <PestDetailModal
          pest={selectedPest}
          onClose={() => setSelectedPest(null)}
        />
      )}
      {selectedIrrigation && (
        <IrrigationDetailModal
          irrigation={selectedIrrigation}
          onClose={() => setSelectedIrrigation(null)}
        />
      )}
      {selectedTask && (
        <TaskDetailModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onComplete={(taskId) => {
            console.log("Task completed:", taskId);
            setSelectedTask(null);
          }}
        />
      )}
    </div>
  );
}
