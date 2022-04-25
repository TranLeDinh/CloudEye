
import serial.tools.list_ports
import random
import time
import sys
from Adafruit_IO import MQTTClient

AIO_FEED_ID = "bbc_led"
AIO_USERNAME = "luongduy2001"
AIO_KEY = "aio_SgDI702NwVLEX6gODohqxSZ7vxbY"

AIO_FEED_IDS = ["bbc-led", "bbc-pump"]

def  connected(client):
    print("Ket noi thanh cong...")
    for feed in AIO_FEED_IDS:
        client.subscribe(feed)

def  subscribe(client , userdata , mid , granted_qos):
    print("Subcribe thanh cong...")

def  disconnected(client):
    print("Ngat ket noi...")
    sys.exit (1)

def  message(client , feed_id , payload):
    print("Nhan du lieu: " + payload)
    if isMicrobitConnected:
        ser.write((str(payload) + "#").encode())

client = MQTTClient(AIO_USERNAME , AIO_KEY)
client.on_connect = connected
client.on_disconnect = disconnected
client.on_message = message
client.on_subscribe = subscribe
client.connect()
client.loop_background()

def sendOpenSignal():
  client.publish("bbc-pump", 2)
def sendNotOpenSignal():
  client.publish("bbc-pump", 3)
