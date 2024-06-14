declare module 'react-barcode-reader' {
    import { Component } from 'react';
  
    interface BarcodeReaderProps {
      onError: (error: any) => void;
      onScan: (data: string | null) => void;
    }
  
    export default class BarcodeReader extends Component<BarcodeReaderProps> {}
  }
  