# By: Brendan Luke
# Date: September 27, 2021
# Purpose: testing FFTs in Python
from datetime import datetime
startTime = datetime.now()

# import modules
import math
import numpy as np
import matplotlib.pyplot as plt

# FFT function (real, one sided, normalized)
def fft(t,y):
    # initialize real and imaginary outputs
    real = [0]*int(len(y)/2)
    #image = [0]*len(y)
    freqs = [0]*int(len(y)/2)

    # perform DFT
    k = 0 # Fourier transform index
    for x in range(int(len(y)/2)): # k span
        n = 0 # data index
        freqs[k] = k/(t[1]-t[0])/len(y) # frequency of k'th value (Hz)
        for i in y: # n span
            real[x] = real[x] + i*math.cos(2*math.pi/len(y)*k*n)
            n += 1 # increment
        k += 1 # increment
        print(int(2*k/len(y)*100)) # print current % done
    
    # normalize & abs the output
    real[:] = [abs(x) for x in real]
    real[:] = [abs(x) / max(real) for x in real]

    # return outputs
    return {'Frequencies': freqs, 'Gains':real}


# Test function with 4096 length sinusoid
n = 4096
y = [0]*n
t = [0]*n
A = 3500
B = 2100
C = 5900
fs = 48000 # sampling frequency (Hz)
i = 0

for x in range(n):
    t[i] = 1/fs*i
    y[i] = math.sin(2*math.pi*A*t[i]) + math.sin(2*math.pi*B*t[i]) + math.sin(2*math.pi*C*t[i])
    i += 1

result = fft(t,y)

plt.plot(result['Frequencies'],result['Gains'])
plt.grid()
plt.xlabel('Frequencies (Hz)')
plt.ylabel('Normalized Gain')
plt.ylim((0,1))
plt.xlim((0,fs/2))

# Stop Clock & Show plot
print('Done! Execution took ' + str(datetime.now() - startTime))
plt.show()