import os
savepath = 'D:/dataset/'

def train(train_path):
        TrainingImagePath=train_path
        from keras.preprocessing.image import ImageDataGenerator


        test_datagen = ImageDataGenerator()
 
# Generating the Training Data
        train_datagen = ImageDataGenerator(
                shear_range=0.1,
                zoom_range=0.1,
                horizontal_flip=True)
 
        training_set = train_datagen.flow_from_directory(
                TrainingImagePath,
                target_size=(64, 64),
                batch_size=8,
                class_mode='categorical')
 
 
# Generating the Testing Data
        test_set = test_datagen.flow_from_directory(
                TrainingImagePath,
                target_size=(64, 64),
                batch_size=8,
                class_mode='categorical')
 
# Printing class labels for each face
        test_set.class_indices


        TrainClasses=training_set.class_indices
 

        ResultMap={}
        for faceValue,faceName in zip(TrainClasses.values(),TrainClasses.keys()):
                ResultMap[faceValue]=faceName


        def countdata():
                count=0
                path=os.path.join(TrainingImagePath)
                for folder in os.listdir(path):
                        if folder != '.DS_Store':
                                for file in os.listdir(os.path.join(path,folder)):
                                        count=count+1
                return count
        trainnum=countdata()

 
# The number of neurons for the output layer is equal to the number of faces
        OutputNeurons=len(ResultMap)
        print('\n The Number of output neurons: ', OutputNeurons)

        from keras.models import Sequential
        from keras.layers import Convolution2D
        from keras.layers import MaxPool2D
        from keras.layers import Flatten
        from keras.layers import Dense
 

        classifier= Sequential()
 

        classifier.add(Convolution2D(32, kernel_size=(5, 5), strides=(1, 1), input_shape=(64,64,3), activation='relu'))
 

        classifier.add(MaxPool2D(pool_size=(2,2)))
 

        classifier.add(Convolution2D(64, kernel_size=(5, 5), strides=(1, 1), activation='relu'))
 
        classifier.add(MaxPool2D(pool_size=(2,2)))
 

        classifier.add(Flatten())
 

        classifier.add(Dense(64, activation='relu'))
 
        classifier.add(Dense(OutputNeurons, activation='softmax'))
 

        classifier.compile(loss='categorical_crossentropy', optimizer = 'adam', metrics=["accuracy"])
 
###########################################################

 
# Starting the model training
        classifier.fit_generator(
                    training_set,
                    steps_per_epoch=trainnum//8,
                    epochs=10,
                    validation_data=test_set,
                    validation_steps=trainnum//8)
        test_set.reset()
        scores = classifier.evaluate(test_set)
        classifier.save(os.path.join(savepath,'keras_model.h5'))
        return scores[1]
def fulltrain(val_path):
        val_accurary=0
        i=0
        while val_accurary<0.93 and i<10:
                val_accurary=train(val_path)
                i=i+1
                

