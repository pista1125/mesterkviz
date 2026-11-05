import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Camera, X, AlertCircle, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import { extractRoomCodeFromText } from '@/lib/qrUtils';

interface QRScannerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onScanSuccess: (roomCode: string) => void;
}

export const QRScannerModal: React.FC<QRScannerModalProps> = ({
  open,
  onOpenChange,
  onScanSuccess,
}) => {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(false);
  const qrScannerRef = useRef<Html5Qrcode | null>(null);
  const isScanningRef = useRef(false);
  const readerElementId = 'qr-reader-container';

  const stopScanner = useCallback(async () => {
    if (qrScannerRef.current && isScanningRef.current) {
      try {
        isScanningRef.current = false;
        await qrScannerRef.current.stop();
        qrScannerRef.current.clear();
      } catch (err) {
        console.error('Error stopping QR scanner:', err);
      }
    }
  }, []);

  const handleDetectedText = useCallback(async (decodedText: string) => {
    const code = extractRoomCodeFromText(decodedText);
    if (!code) {
      toast.error('A beolvasott QR-kód nem tartalmaz érvényes 6-jegyű szobakódot.');
      return;
    }

    // Stop camera and deliver code
    await stopScanner();
    toast.success(`Szobakód beolvasva: ${code}!`);
    onScanSuccess(code);
    onOpenChange(false);
  }, [stopScanner, onScanSuccess, onOpenChange]);

  const startScanner = useCallback(async () => {
    setErrorMsg(null);
    setIsInitializing(true);

    try {
      if (!qrScannerRef.current) {
        qrScannerRef.current = new Html5Qrcode(readerElementId);
      }

      // If already running, stop first
      if (isScanningRef.current) {
        await stopScanner();
      }

      const qrboxFunction = (viewfinderWidth: number, viewfinderHeight: number) => {
        const minEdge = Math.min(viewfinderWidth, viewfinderHeight);
        const qrboxSize = Math.floor(minEdge * 0.7);
        return {
          width: Math.max(qrboxSize, 200),
          height: Math.max(qrboxSize, 200),
        };
      };

      await qrScannerRef.current.start(
        { facingMode: 'environment' },
        {
          fps: 10,
          qrbox: qrboxFunction,
          aspectRatio: 1.0,
        },
        (decodedText) => {
          handleDetectedText(decodedText);
        },
        () => {
          // ignore frame decode misses
        }
      );

      isScanningRef.current = true;
      setIsInitializing(false);
    } catch (err: any) {
      console.error('QR Scanner start error:', err);
      setIsInitializing(false);
      isScanningRef.current = false;

      let msg = 'Nem sikerült elindítani a kamerát.';
      if (err?.name === 'NotAllowedError' || err?.toString().includes('Permission')) {
        msg = 'A kamerához való hozzáférés el lett utasítva. Engedélyezd a kamerát a böngésződben a beolvasáshoz!';
      } else if (err?.name === 'NotFoundError' || err?.toString().includes('No camera')) {
        msg = 'Nem található kamera a készülékeden.';
      }
      setErrorMsg(msg);
    }
  }, [handleDetectedText, stopScanner]);

  useEffect(() => {
    if (open) {
      // Small timeout to allow dialog animation to render container
      const t = setTimeout(() => {
        startScanner();
      }, 250);
      return () => clearTimeout(t);
    } else {
      stopScanner();
    }
  }, [open, startScanner, stopScanner]);

  useEffect(() => {
    return () => {
      stopScanner();
    };
  }, [stopScanner]);

  return (
    <Dialog open={open} onOpenChange={(val) => {
      if (!val) stopScanner();
      onOpenChange(val);
    }}>
      <DialogContent className="sm:max-w-md p-6 overflow-hidden">
        <DialogHeader className="text-center">
          <DialogTitle className="flex items-center justify-center gap-2 text-xl font-bold">
            <Camera className="h-5 w-5 text-primary" />
            QR kód beolvasása
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            Irányítsd a kamerádat a kivetítőn vagy a tanári kijelzőn látható QR-kódra!
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center justify-center my-3 relative min-h-[280px]">
          {/* Scanner Viewport */}
          <div
            id={readerElementId}
            className="w-full max-w-[320px] aspect-square rounded-2xl overflow-hidden bg-black relative border-2 border-primary/40 shadow-inner"
          />

          {/* Loading Indicator */}
          {isInitializing && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm rounded-2xl gap-3">
              <RefreshCw className="h-8 w-8 text-primary animate-spin" />
              <p className="text-xs font-semibold text-muted-foreground">Kamera inicializálása...</p>
            </div>
          )}

          {/* Error Message */}
          {errorMsg && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-card/95 p-6 text-center rounded-2xl gap-3 z-10 border border-destructive/30">
              <AlertCircle className="h-10 w-10 text-destructive" />
              <p className="text-sm font-medium text-destructive">{errorMsg}</p>
              <div className="flex gap-2 mt-2">
                <Button size="sm" variant="outline" onClick={startScanner}>
                  <RefreshCw className="mr-1.5 h-3.5 w-3.5" /> Újrapróbálás
                </Button>
                <Button size="sm" variant="secondary" onClick={() => onOpenChange(false)}>
                  Kézi kódmegadás
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <Button
            type="button"
            variant="ghost"
            onClick={() => onOpenChange(false)}
            className="w-full"
          >
            <X className="mr-2 h-4 w-4" /> Mégse / Kézi kódmegadás
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

