import { Component, type ErrorInfo, type ReactNode } from 'react';
import { reportClientError } from '@/lib/errorReporting';

interface Props {
  children: ReactNode;
}

interface State {
  error: Error | null;
}

const CHUNK_RELOAD_KEY = 'kvizmester_chunk_reload';

const isChunkLoadError = (error: Error) =>
  /Failed to fetch dynamically imported module|Importing a module script failed|error loading dynamically imported module|ChunkLoadError/i.test(
    `${error?.name} ${error?.message}`
  );

/**
 * Ha egy oldal megjelenítése közben hiba történik, a diák/tanár ne egy üres (fehér) képernyőt
 * lásson, hanem egy "Újratöltés" gombot. A hibát a hibanaplóba is elküldjük.
 *
 * Új verzió telepítése után a régi lap a már nem létező kódrészleteket próbálhatja betölteni –
 * ilyenkor egyszer automatikusan újratöltjük az oldalt.
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    if (isChunkLoadError(error)) {
      try {
        if (!sessionStorage.getItem(CHUNK_RELOAD_KEY)) {
          sessionStorage.setItem(CHUNK_RELOAD_KEY, '1');
          window.location.reload();
          return;
        }
      } catch {
        /* */
      }
    }
    reportClientError(error, 'react-render', info.componentStack || undefined);
  }

  render() {
    if (!this.state.error) return this.props.children;
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background p-6 text-center">
        <h1 className="text-2xl font-bold text-foreground">Hoppá, valami elakadt 😕</h1>
        <p className="max-w-sm text-muted-foreground">
          Töltsd újra az oldalt – ha már csatlakoztál egy kvízhez, automatikusan visszakerülsz.
        </p>
        <button
          className="rounded-lg bg-primary px-6 py-3 font-bold text-primary-foreground shadow"
          onClick={() => {
            try { sessionStorage.removeItem(CHUNK_RELOAD_KEY); } catch { /* */ }
            window.location.reload();
          }}
        >
          Újratöltés
        </button>
      </div>
    );
  }
}
