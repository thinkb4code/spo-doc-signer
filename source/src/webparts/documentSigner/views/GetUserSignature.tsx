import * as React from 'react';
import { IGetUserSignatureProps, IGetUserSignatureState } from '../model/GetUserSignature.model';
import { useState } from 'react';


export default class GetUserSignature extends React.Component <IGetUserSignatureProps, IGetUserSignatureState>{
    constructor(props: IGetUserSignatureProps){
        
        super(props);
        this.state = {
            userName: ""
        };
    }

    public render(): React.ReactElement<IGetUserSignatureProps> {
        const [userName, setUserName] = useState<string>("");

        return (
            <div>
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
                    <div>{userName}</div>
                    <div>{userName}</div>
                    <div>
                        <div>Use custom signature</div>
                        <div>
                            
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}