def order_sandwich(customer, description, duration)
  puts "> #{customer} ordered a #{description}"
  sleep duration # a blocking operation
  sandwich = "a delicious #{description}"
  puts "- #{customer}, you're order is ready!"
  puts "< #{customer} is enjoying #{sandwich}"
end

order_sandwich('Jarrett', 'Roast Pork and Pickled Cucumber Sandwich', 4)
order_sandwich('Mike', 'Reuben on Rye', 2)
order_sandwich('Marc', 'Smoked Salmon Salad Sandwich', 6)
order_sandwich('Shawn', 'Apple Peanut Butter Sandwich', 1)
