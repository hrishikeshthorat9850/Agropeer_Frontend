"use client";
import React from "react";
import { useLanguage } from "@/Context/languagecontext";

class ErrorBoundaryClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    const { t } = this.props;
    if (this.state.hasError) {
      return (
        <div className="min-h-[calc(100vh-122px)] flex items-center justify-center bg-red-50">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {t("oops_message")}
            </h2>
            <p className="text-gray-600 mb-6">{t("unexpected_error_desc")}</p>
            <div className="space-y-3">
              <button
                onClick={() => window.location.reload()}
                className="w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors"
              >
                {t("refresh_btn")}
              </button>
              <button
                onClick={() => this.setState({ hasError: false, error: null })}
                className="w-full bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700 transition-colors"
              >
                {t("try_again_btn")}
              </button>
            </div>
            {process.env.NODE_ENV === "development" && this.state.error && (
              <details className="mt-4 text-left">
                <summary className="cursor-pointer text-sm text-gray-500">
                  {t("error_details_dev")}
                </summary>
                <pre className="mt-2 text-xs text-red-600 bg-red-50 p-2 rounded overflow-auto">
                  {this.state.error.toString()}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default function ErrorBoundary(props) {
  const { t } = useLanguage();
  return <ErrorBoundaryClass t={t} {...props} />;
}
