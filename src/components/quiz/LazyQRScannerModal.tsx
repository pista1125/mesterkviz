import { lazy, Suspense, type ComponentProps } from 'react';

// A QR-olvasó könyvtár (html5-qrcode) nagy; csak akkor töltjük le, amikor a diák
// tényleg megnyomja a QR gombot – így a csatlakozó oldal gyorsabban betölt.
const QRScannerModalImpl = lazy(() =>
  import('./QRScannerModal').then((m) => ({ default: m.QRScannerModal }))
);

type Props = ComponentProps<typeof QRScannerModalImpl>;

export const QRScannerModal = (props: Props) => {
  if (!props.open) return null;
  return (
    <Suspense fallback={null}>
      <QRScannerModalImpl {...props} />
    </Suspense>
  );
};
