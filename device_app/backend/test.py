
'''########### Making single predictions ###########'''
import numpy as np
import os
import PIL
import tensorflow as tf
import cv2
from tensorflow import keras
from tensorflow.keras import layers
from tensorflow.keras.models import Sequential
from keras.preprocessing import image
from keras.models import load_model
def test(train_path,test_path):
        TrainingImagePath=train_path
 
        from keras.preprocessing.image import ImageDataGenerator
# Understand more about ImageDataGenerator at below link
# https://blog.keras.io/building-powerful-image-classification-models-using-very-little-data.html
        classifier=load_model('keras_model.h5') 
# Defining pre-processing transformations on raw images of training data
# These hyper parameters helps to generate slightly twisted versions
# of the original image, which leads to a better model, since it learns
# on the good and bad mix of images
        train_datagen = ImageDataGenerator(
        shear_range=0.1,
        zoom_range=0.1,
        horizontal_flip=True)
 
# Defining pre-processing transformations on raw images of testing data
# No transformations are done on the testing images
        test_datagen = ImageDataGenerator()
 
# Generating the Training Data
        training_set = train_datagen.flow_from_directory(
        TrainingImagePath,
        target_size=(64, 64),
        batch_size=32,
        class_mode='categorical')
 
 
# Generating the Testing Data
        test_set = test_datagen.flow_from_directory(
        TrainingImagePath,
        target_size=(64, 64),
        batch_size=32,
        class_mode='categorical')
 
# Printing class labels for each face
        test_set.class_indices

# class_indices have the numeric tag for each face
        TrainClasses=training_set.class_indices
 
# Storing the face and the numeric tag for future reference

        ResultMap={}
        for faceValue,faceName in zip(TrainClasses.values(),TrainClasses.keys()):
                ResultMap[faceValue]=faceName
# Saving the face map for future reference
 
# The model will give answer as a numeric tag
# This mapping will help to get the corresponding face name for it
        print("Mapping of Face and its ID",ResultMap)
 
# The number of neurons for the output layer is equal to the number of faces
        OutputNeurons=len(ResultMap)
        ImagePath=test_path
        test_image=image.load_img(ImagePath,target_size=(64, 64))
        test_image=image.img_to_array(test_image)
 
        test_image=np.expand_dims(test_image,axis=0)
        result=classifier.predict(test_image,verbose=0)
#print(training_set.class_indices)
        print(100*result[0])
        p=100*max(result[0])
        if p>96.5:
                print('Prediction is: ',ResultMap[np.argmax(result)])
        else:
                print('Unknown person')
