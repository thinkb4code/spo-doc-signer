import * as React from 'react';
import { IGetUserSignatureProps } from '../model/GetUserSignature.model';
import { useState, useRef } from 'react';
import styles from '../assets/css/GetUserSignature.module.scss';

const GetUserSignature: React.FC<IGetUserSignatureProps> = ({ }) => {
    const [userName, setUserName] = useState<string>("");
    const [signatureData, setSignatureData] = useState<string | null>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const startDrawing = (event: React.MouseEvent<HTMLCanvasElement>): void => {
        if (!canvasRef.current) return;

        setIsDrawing(true);
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) {
            ctx.lineWidth = 2;
            ctx.lineCap = 'round';
            ctx.strokeStyle = '#000';

            const { offsetX, offsetY } = event.nativeEvent;
            ctx.beginPath();
            ctx.moveTo(offsetX, offsetY);
        }
    };

    const draw = (event: React.MouseEvent<HTMLCanvasElement>): void => {
        if (!isDrawing || !canvasRef.current) return;

        const ctx = canvasRef.current.getContext('2d');
        if (ctx) {
            const { offsetX, offsetY } = event.nativeEvent;
            ctx.lineTo(offsetX, offsetY);
            ctx.stroke();
        }
    };

    const stopDrawing = (): void => {
        if (!canvasRef.current) return;

        setIsDrawing(false);
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) {
            ctx.beginPath();
        }
    };

    const clearCanvas = (): void => {
        if (!canvasRef.current) return;

        const ctx = canvasRef.current.getContext('2d');
        if (ctx) {
            ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        }
        setSignatureData(null);
    };

    const saveSignature = (): void => {
        if (!canvasRef.current) return;

        const dataURL = canvasRef.current.toDataURL('image/png');
        setSignatureData(dataURL);
    };

    return (
        <div className={styles.getUserSignature}>
            <h2>Select your signature</h2>
            <div>
                <div>Enter your full name: </div>
                <div>
                    <input
                        type="text"
                        placeholder="Type something..."
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        style={{ padding: "10px", width: "100%", marginBottom: "20px" }}
                    />
                </div>
            </div>
            <div>
                <div className={styles.signOne}>{userName}</div>
                <div className={styles.signTwo}>{userName}</div>
                <div>
                    <div>Use custom signature</div>
                    <div>
                        <canvas ref={canvasRef} width={500} height={200} style={{ border: '1px solid #000' }}
                            onMouseDown={startDrawing}
                            onMouseMove={draw}
                            onMouseUp={stopDrawing}
                            onMouseLeave={stopDrawing}
                        />
                        <br />
                        <button onClick={clearCanvas}>Clear</button>
                        <button onClick={saveSignature}>Save</button>
                        {signatureData && (
                            <div>
                                <p><a href={signatureData} download="signature.png">Download Signature</a></p>
                                <img src={signatureData} alt="Signature Preview" style={{ border: '1px solid #000', marginTop: '10px' }} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GetUserSignature;