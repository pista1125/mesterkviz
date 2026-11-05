import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Copy, Check, Maximize2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getJoinUrl } from '@/lib/qrUtils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface QRCodeDisplayProps {
  code: string;
  size?: number;
  className?: string;
  showCopy?: boolean;
  showEnlarge?: boolean;
  subtitle?: string;
}

export const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({
  code,
  size = 180,
  className,
  showCopy = true,
  showEnlarge = true,
  subtitle,
}) => {
  const [copied, setCopied] = useState(false);
  const [isEnlarged, setIsEnlarged] = useState(false);
  const joinUrl = getJoinUrl(code);

  const handleCopyLink = async (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    try {
      await navigator.clipboard.writeText(joinUrl);
      setCopied(true);
      toast.success('Csatlakozási link vágólapra másolva!');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Nem sikerült a vágólapra másolni');
    }
  };

  return (
    <>
      <div className={cn("flex flex-col items-center gap-3", className)}>
        {/* QR Code Card */}
        <div
          onClick={() => showEnlarge && setIsEnlarged(true)}
          className={cn(
            "relative group bg-white p-3.5 rounded-2xl shadow-lg border-2 border-primary/20 transition-all duration-300",
            showEnlarge && "cursor-pointer hover:scale-[1.03] hover:shadow-primary/20 hover:border-primary/50"
          )}
          title={showEnlarge ? "Kattints a nagyításhoz" : undefined}
        >
          <QRCodeSVG
            value={joinUrl}
            size={size}
            level="M"
            className="rounded-lg"
          />
          {showEnlarge && (
            <div className="absolute inset-0 bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white backdrop-blur-[1px]">
              <div className="flex items-center gap-1.5 text-xs font-bold bg-black/60 px-3 py-1.5 rounded-full border border-white/20">
                <Maximize2 className="h-3.5 w-3.5" /> Nagyítás
              </div>
            </div>
          )}
        </div>

        {subtitle && (
          <p className="text-xs text-muted-foreground text-center font-medium max-w-[220px]">
            {subtitle}
          </p>
        )}

        {showCopy && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleCopyLink}
            className="text-xs h-8 gap-1.5 rounded-full px-3.5 font-medium border-border/80 hover:bg-accent"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-quiz-green" />
                <span>Link kimásolva</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5 text-muted-foreground" />
                <span>Link másolása</span>
              </>
            )}
          </Button>
        )}
      </div>

      {/* Enlarged Dialog for Projection */}
      {showEnlarge && (
        <Dialog open={isEnlarged} onOpenChange={setIsEnlarged}>
          <DialogContent className="sm:max-w-md text-center flex flex-col items-center p-6">
            <DialogHeader className="items-center text-center">
              <DialogTitle className="font-display text-2xl font-bold tracking-widest text-primary">
                Szoba: {code}
              </DialogTitle>
              <p className="text-xs text-muted-foreground">
                Olvasd be a kameráddal a telefonodon a csatlakozáshoz!
              </p>
            </DialogHeader>

            <div className="bg-white p-6 rounded-3xl shadow-2xl border-4 border-primary/20 my-4">
              <QRCodeSVG
                value={joinUrl}
                size={280}
                level="Q"
                className="rounded-xl"
              />
            </div>

            <div className="flex flex-col items-center gap-2 w-full">
              <div className="font-mono text-xs text-muted-foreground break-all px-3 py-1.5 rounded-lg bg-muted/60 border w-full max-w-sm">
                {joinUrl}
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleCopyLink}
                className="text-xs rounded-full gap-1.5"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-quiz-green" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? 'Kimásolva' : 'Közvetlen link másolása'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

