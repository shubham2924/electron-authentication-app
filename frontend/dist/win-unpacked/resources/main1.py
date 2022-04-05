import cv2
import subprocess
import os
def code():

    #*******************--------------------****************#
    # using os.system() module to run concurrently but results consecutive run where as same time running was expected
    # cmd = 'python main1.py & main3.py'
    # cmd1 = 'python main1.py'
    # cmd2 = 'python snake.py'
    # os.system(cmd1)
    # os.system(cmd2)


    #*******************--------------------****************#
    # using subprocess inbuilt module for concurrent running of python files
    process1 = subprocess.Popen(["python", "game.py"])
    process2 = subprocess.Popen(["python", "snake.py"])
    process1()
    process2()
    


    #*******************--------------------****************#
    #basic opencv code which open a camera
    # cap = cv2.VideoCapture()
    # # The device number might be 0 or 1 depending on the device and the webcam
    # cap.open(0, cv2.CAP_DSHOW)
    # while(True):
    #     ret, frame = cap.read()
    #     cv2.imshow('frame', frame)
    #     if cv2.waitKey(1) & 0xFF == ord('q'):
    #         break
    # cap.release()
    # cv2.destroyAllWindows()


if __name__ == '__main__':
    code()