 // By default
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

// To create a TCP server
using System;
using System.Net; 
using System.Net.Sockets; 
using System.Text; 
using System.Threading; 

public class PassthroughManager : MonoBehaviour
{

    // For Oculus funtionality
    public OVRPassthroughLayer passthrough;
    public OVRInput.Button button;
    public OVRInput.Controller controller;
    public int state;
    public Vector3 leftpos;
    public Vector3 rightpos;
    public Vector3 currentpos;
    public Vector3 currentorient;
    public Vector3 goalpos;
    public double forward_dist;
    public Quaternion leftorient;
    public Quaternion rightorient;

    // For TCP server
    #region private members 
    private TcpListener tcpListener; 
    private Thread tcpListenerThread;  	
    private TcpClient connectedTcpClient; 	
    #endregion 	

    // Start is called before the first frame update
    void Start()
    {
        Debug.Log("Starting..."); 
        state = 0;

        // For TCP server
        tcpListenerThread = new Thread (new ThreadStart(ListenForIncommingRequests)); 		
		tcpListenerThread.IsBackground = true; 		
		tcpListenerThread.Start(); 	
    }

    // Update is called once per frame
    void Update()
    {
        leftpos = OVRInput.GetLocalControllerPosition(OVRInput.Controller.LTouch);
        rightpos = OVRInput.GetLocalControllerPosition(OVRInput.Controller.RTouch);
        leftorient = OVRInput.GetLocalControllerRotation(OVRInput.Controller.LTouch);
        rightorient = OVRInput.GetLocalControllerRotation(OVRInput.Controller.RTouch);
        // Debug.Log("Left Pos: " + leftpos.x + " " + leftpos.y + " " + leftpos.z); 
        // Debug.Log("Right Pos: " + rightpos.x + " " + rightpos.y + " " + rightpos.z); 
      
        if (state == 0)
        {
            Debug.Log("Press X to Denote Current Position of Robot"); 
            if (OVRInput.GetDown(OVRInput.Button.One,OVRInput.Controller.LTouch))
            {
                leftpos = OVRInput.GetLocalControllerPosition(OVRInput.Controller.LTouch);
                currentpos = leftpos;
                Debug.Log("Current Pos Recorded as: " + currentpos.x + " " + currentpos.y + " " + currentpos.z); 
                SendMessage("Current Position Recorded");   
                state = 1;
            }
        }
        else if (state == 1)
        {
            Debug.Log("Press X to Denote Current Orietation of Robot"); 
            if (OVRInput.GetDown(OVRInput.Button.One,OVRInput.Controller.LTouch))
            {
                leftpos = OVRInput.GetLocalControllerPosition(OVRInput.Controller.LTouch);
                currentpos = leftpos;
                Debug.Log("Current Pos Recorded as: " + currentpos.x + " " + currentpos.y + " " + currentpos.z); 
                SendMessage("Current Orientation Recorded");   
                state = 2;
            }
        }
        else
        {
            Debug.Log("Press X to Denote Goal Position of Robot"); 
            if (OVRInput.GetDown(OVRInput.Button.One,OVRInput.Controller.LTouch))
            {
                rightpos = OVRInput.GetLocalControllerPosition(OVRInput.Controller.RTouch);
                goalpos = leftpos;
                Debug.Log("Goal Pos Recorded as: " + goalpos.x + " " + goalpos.y + " " + goalpos.z); 
                forward_dist = Math.Sqrt(Math.Pow(goalpos.x-currentpos.x,2) + Math.Pow(goalpos.y-currentpos.y,2));
                SendMessage(forward_dist.ToString("0.000"));   
                state = 0;
            }
        }
        //Debug.Log("kkkkk"); 
        // if(OVRInput.GetDown(button,controller))
        // {
        //     //passthrough.hidden = !passthrough.hidden;
        //     Debug.Log("Hello: "); 
        // }
    }


    // For TCP Server
    private void ListenForIncommingRequests () { 		
		try { 			
			// Create listener on localhost port 8052. 			
			tcpListener = new TcpListener(IPAddress.Parse("192.168.0.100"), 8052); 			
			tcpListener.Start();              
			Debug.Log("Server is listening");              
			Byte[] bytes = new Byte[1024];  			
			while (true) { 				
				using (connectedTcpClient = tcpListener.AcceptTcpClient()) { 					
					// Get a stream object for reading 					
					using (NetworkStream stream = connectedTcpClient.GetStream()) { 						
						int length; 						
						// Read incomming stream into byte arrary. 						
						while ((length = stream.Read(bytes, 0, bytes.Length)) != 0) { 							
							var incommingData = new byte[length]; 							
							Array.Copy(bytes, 0, incommingData, 0, length);  							
							// Convert byte array to string message. 							
							string clientMessage = Encoding.ASCII.GetString(incommingData); 							
							Debug.Log("client message received as: " + clientMessage); 						
						} 					
					} 				
				} 			
			} 		
		} 		
		catch (SocketException socketException) { 			
			Debug.Log("SocketException " + socketException.ToString()); 		
		}     
	}
    
    private void SendMessage(string msg) { 		
		if (connectedTcpClient == null) {             
			return;         
		}  		
		
		try { 			
			// Get a stream object for writing. 			
			NetworkStream stream = connectedTcpClient.GetStream(); 			
			if (stream.CanWrite) {                 
				string serverMessage = msg; 			
				// Convert string message to byte array.                 
				byte[] serverMessageAsByteArray = Encoding.ASCII.GetBytes(serverMessage); 				
				// Write byte array to socketConnection stream.               
				stream.Write(serverMessageAsByteArray, 0, serverMessageAsByteArray.Length);               
				Debug.Log("Server sent his message - should be received by client");           
			}       
		} 		
		catch (SocketException socketException) {             
			Debug.Log("Socket exception: " + socketException);         
		} 	
	} 
}
