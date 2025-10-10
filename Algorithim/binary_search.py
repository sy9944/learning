def binary_search(arr, item):
    print("item",item)
    count = 0
    low = 0
    high = len(arr) - 1
    print("low",low,"high",high)

    while low <= high:
        count += 1
        mid = (low + high) // 2
        print("mid",mid)
        guess = arr[mid]
        print("guess",guess)
        if guess == item:
            print("一致")
            return count
        if guess > item:
            high = mid -1
            print("high->",high)
        else:
            low = mid + 1
            print("low->",low)
    return count

arr = [1,3,5,7,9]
print("arr", [1,3,5,7,9])
print("index of 3",binary_search(arr, 3))  # Output: 1
print("index of -1",binary_search(arr, -1)) # Output: None
print("index of 7",binary_search(arr, 7))  # Output: 3