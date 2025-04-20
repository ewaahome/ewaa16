'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
          <h2 className="text-2xl font-bold mb-4">حدث خطأ غير متوقع</h2>
          <p className="mb-4">نأسف لحدوث هذا الخطأ. يرجى تحديث الصفحة للمحاولة مرة أخرى.</p>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="px-4 py-2 bg-rose-500 text-white rounded-md hover:bg-rose-600 transition"
          >
            حاول مرة أخرى
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}