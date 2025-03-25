/*
===========================
🌐 DIALOGUE FLOW MAP
===========================

boot
 ├── Initiate Program -> hello1
 ├── Hello? -> hello
 └── Help Games -> hello1

hello1
 ├── Yes hello -> hello
 ├── OoOOoh I'm a ghost! -> silent2
 └── . . . -> silent_1

hello
 ├── I am a real person. Who is this? -> who_response
 ├── I know as much as you do. Who is this? -> who_response
 └── . . . -> silent_1

silent_1
 ├── . . . -> silent_2
 ├── Hey I'm here! Who is this? -> who_response
 └── Sorry, some interference. But I'm here. -> who_response

silent_2
 ├── Hey I'm here, I don't know those people! Who's this? -> who_response
 └── Darn interference. Computers... right? Who's this? -> who_response

who_response
 └── Where are you? -> where
 └── What happened? It just turned on?" -> "what_is_this"

where
 └── Can you describe the room? -> where_describe

where_describe
 ├── Maybe see if the computer can show a way out -> try_computer
 └── What about in the hallway? -> hall

hall
 └── Well maybe the computer can help -> try_computer

try_computer
 ├── Company? What company? -> what_co
 └── Files of what? -> wh_file

what_co
 ├── Can you try sending them? -> send_blueprints
 └── Maybe the files can tell us something -> wh_file

wh_file
 └── Can you try sending it? -> send_blueprints

send_blueprints
 ├── Yep. What is this? -> file1got
 └── No...evil chuckle -> evil_chuckles

evil_chuckles
 ├── uh....cough cough Anyway... -> awkward
 └── No...evil chuckle again -> awkward

awkward
 └── Keep digging. Look for files about exits. -> ab_exits

ab_exits
 └── Keep looking -> heard

heard
 ├── Probably just your nerves. Keep looking. -> keep_l
 ├── Could it be your friends? -> hall_friend
 └── What did you hear? -> wh_hear

keep_l
 └── Can you get behind the bookshelf? -> bookshelf_b

hall_friend
 ├── Maybe just focus on the bookshelf. Can you get behind it? -> bookshelf_b
 ├── You should go investigate, just in case -> inv1
 └── What did it sound like? -> wh_hear

wh_hear
 ├── Yeah avoid that... Can you get behind the bookshelf? -> bookshelf_b
 └── You should check it out -> inv1

inv1
 ├── Well better safe than sorry. Think you can get behind the bookshelf? -> bookshelf_b
 └── Lets hope it was nothing. Can you move that bookshelf? -> bookshelf_b

bookshelf_b
 └── Go try! There's a chance it could help! -> bookshelf_f

bookshelf_f
 └── Great Job! Maybe we can find the code in the computer files? -> f_code

f_code
 └── Off how...? -> offhow

offhow
 └── Strange... -> somewhere

somewhere
 └── I'm not so sure you're alone -> not_sure

not_sure
===========================
*/
