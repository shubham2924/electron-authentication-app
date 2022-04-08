import mediapipe as mp
import cv2
import numpy as np
from mediapipe.framework.formats import landmark_pb2
import time
import random
 
mp_drawing = mp.solutions.drawing_utils
mp_hands = mp.solutions.hands
score=0
time=120 #Added time variable
 
x_enemy=random.randint(50,600)
y_enemy=random.randint(50,400)
 
def enemy():
  global score,x_enemy,y_enemy,time #Declared the scope
  #x_enemy=random.randint(50,600)
  #y_enemy=random.randint(50,400)
  cv2.circle(image, (x_enemy,y_enemy), 25, (0, 200, 0), 5)
  #score=score+1
 
video = cv2.VideoCapture(0)
 
with mp_hands.Hands(min_detection_confidence=0.8, min_tracking_confidence=0.5) as hands: 
    while video.isOpened():
        _, frame = video.read()
 
        image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
         
        image = cv2.flip(image, 1)
         
        imageHeight, imageWidth, _ = image.shape
 
        results = hands.process(image)
   
 
        image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
  
        font=cv2.FONT_HERSHEY_SIMPLEX
        color=(255,0,255)
        text=cv2.putText(image,"Score",(480,30),font,1,color,4,cv2.LINE_AA)
        text=cv2.putText(image,str(score),(590,30),font,1,color,4,cv2.LINE_AA)
        text=cv2.putText(image,"Time",(30,30),font,1,color,4,cv2.LINE_AA)   #Plain text addition
        text=cv2.putText(image,str(time),(130,30),font,1,color,4,cv2.LINE_AA)
 
        enemy()
 
        if results.multi_hand_landmarks:
            for num, hand in enumerate(results.multi_hand_landmarks):
                mp_drawing.draw_landmarks(image, hand, mp_hands.HAND_CONNECTIONS, 
                                        mp_drawing.DrawingSpec(color=(250, 44, 250), thickness=2, circle_radius=2),
                                         )
 
 
        if results.multi_hand_landmarks != None:
          for handLandmarks in results.multi_hand_landmarks:
            for point in mp_hands.HandLandmark:
 
    
                normalizedLandmark = handLandmarks.landmark[point]
                pixelCoordinatesLandmark = mp_drawing._normalized_to_pixel_coordinates(normalizedLandmark.x, normalizedLandmark.y, imageWidth, imageHeight)
    
                point=str(point)
                #print(point)
                if point=='HandLandmark.INDEX_FINGER_TIP':
                 try:
                     time -= 1;  #Decreasing the time
                     cv2.circle(image, (pixelCoordinatesLandmark[0], pixelCoordinatesLandmark[1]), 25, (0, 200, 0), 5)
                     #print(pixelCoordinatesLandmark[1])
                     if pixelCoordinatesLandmark[0]==x_enemy or pixelCoordinatesLandmark[0]==x_enemy+10 or pixelCoordinatesLandmark[0]==x_enemy-10:
                        #if pixelCoordinatesLandmark[1]==y_enemy or pixelCoordinatesLandmark[1]==y_enemy+10 or pixelCoordinatesLandmark[1]==y_enemy-10:
                      #if pixelCoordinatesLandmark[1]==y_enemy or pixelCoordinatesLandmark[1]==y_enemy+10 or pixelCoordinatesLandmark[1]==y_enemy-10:
                        print("found")
                        x_enemy=random.randint(50,600)
                        y_enemy=random.randint(50,400)
                        score=score+1
                        font=cv2.FONT_HERSHEY_SIMPLEX
                        color=(255,0,255)
                        text=cv2.putText(frame,"Score",(100,100),font,1,color,4,cv2.LINE_AA)
                        enemy()
                 except:
                  pass
        cv2.namedWindow('Hand Tracking', cv2.WINDOW_NORMAL)
        cv2.moveWindow("Hand Tracking", 100, 50)
        cv2.imshow('Hand Tracking', image)
        #time.sleep(1)
 
        if cv2.waitKey(10) & time == 0:  #Condition to check time
            print(score)
            img=cv2.putText(image,f"Your final score: {score}",(200,300),font,1,color,4,cv2.LINE_AA)
            #img=cv2.putText(image,str(score),(590,30),font,1,color,4,cv2.LINE_AA)
            cv2.imshow("Img", img)
            cv2.waitKey(5000)
            break

#cv2.imshow("Img", img)
#video.release()
#cv2.destroyAllWindows()