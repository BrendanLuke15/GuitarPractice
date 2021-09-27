# By: Brendan Luke
# Date: September 27, 2021
# Purpose: testing FFTs in Python
from datetime import datetime
startTime = datetime.now()

# import modules
import math
import numpy as np
import matplotlib.pyplot as plt

# FFT function
def fft(t,y):
    # initialize real and imaginary outputs
    real = [0]*len(y)
    #image = [0]*len(y)
    freqs = [0]*len(y)

    # perform DFT
    k = 0 # Fourier transform index
    for x in range(len(y)): # k span
        n = 0 # data index
        freqs[k] = k/(t[1]-t[0])/len(y) # frequency of k'th value (Hz)
        for i in y: # n span
            real[x] = real[x] + x*math.cos(2*math.pi/len(y)*k*n)
            n += 1 # increment
        k += 1 # increment
    
    # normalize output
    real[:] = [x / max(real) for x in real]


# Test function




# Stop Clock
print('Done! Execution took ' + str(datetime.now() - startTime))