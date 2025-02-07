from collections import deque
class HashTable:
    def __init__(self):
        self.max = 10
        self.array = [[] for _ in range(self.max)]
        print(self.array)
    
    def get_hash(self, key):
        hash = 0
        for char in key:
            hash += ord(char)
        return hash % self.max

    def __setitem__(self, key, value):
        hash = self.get_hash(key)
        found = False
        for index, element in enumerate(self.array[hash]):
            if len(element) == 2 and element[0] == key:
                self.array[hash][index] = (key, value)
                found = True
                break

        if not found:
            self.array[hash].append((key, value))

    def __getitem__(self, key):
        hash = self.get_hash(key)
        for element in self.array[hash]:
            if element[0] == key:
                return element[1]
       
    
    def __delitem__(self, key):
        hash = self.get_hash(key)
        
        for index, element in enumerate(self.array[hash]):
            if element[0] == key:
                del self.array[hash][index]

    def print_table(self):
        print(self.array)

t = HashTable()
t['march 6'] = 10
t['march 4'] = 11
t['march 8'] = 12
t['march 9'] = 13
t['march 17'] = 14




# t.print_table()

num_list = deque()

num_list.append(10)
num_list.append(20)

print(num_list)
    


