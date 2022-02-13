import cv2
def code():
    cap = cv2.VideoCapture()
    # The device number might be 0 or 1 depending on the device and the webcam
    cap.open(0, cv2.CAP_DSHOW)
    while(True):
        ret, frame = cap.read()
        cv2.imshow('frame', frame)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
    cap.release()
    cv2.destroyAllWindows()
if __name__ == '__main__':
    code()