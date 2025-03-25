/*
===========================
🌐 DIALOGUE FLOW MAP
===========================

boot
 ├── Initiate Program? -> hello1
 ├── Hello? -> hello
 └── Help Games -> hello1

hello1
 ├── What is happening? Is someone there?? -> hello
 ├── Yes, hello. -> hello
 ├── OoOOoh I'm a ghost! -> silent_2
 └── . . . -> silent_1

silent_1
 ├── Hello????!!!! PLEASE!! If someone is out there I need help! -> silent_2
 ├── . . . -> silent_2
 ├── Hey, I'm here! Who is this? -> who_response
 └── Sorry, some interference. But I'm here. -> who_response

silent_2
 ├── Jacob???? Adrian???? Colter????? Sarah????? If this is you still messing with me the joke has gone way too far!
 ├── Hey, I'm here, I don't know those people! Who's this? -> who_response
 └── Darn interference. Computers... right? Who's this? -> who_response

 hello
 ├── Hello?! Wait... you are a person? How did you get this computer to turn on? Let alone connect to it...  
 │    You know what? I don’t even care. I'm desperate for any help I can get at this point.
 │
 ├── I am a real person. Who is this? -> who_response
 ├── I know as much as you do. Who is this? -> who_response

who_response
 ├── My name’s Atlas. I thought I was alone. It’s been hours. I tried this computer but couldn't get it to turn on until your message appeared.
 └── Where are you? -> where

where
 ├── Some kind of bunker. Underground, I think. My friends locked me in a closet as a joke. Then I heard a strange humming. A new door appeared, and now I’m stuck in here.
 ├── Can you describe the room? -> where_describe
 └── Check to see if the door can be opened again. -> check_door

where_describe
 ├── It’s a maintenance room. Concrete, rusted pipes, old computer bank, and a locked floor hatch.
 ├── Maybe see if the computer can show a way out. -> try_computer
 └── What about in the hallway? -> hall

check_door
 ├── I tried. It's sealed tight. No keypad, no handle. -> (loops back)

try_computer
 ├── I'm in. This system is ancient. But when you messaged me, it unlocked a bunch of files.
 ├── Good idea, let me know what you find. -> digging
 ├── Be careful. Who knows what’s on there. -> digging
 └── Why would my message unlock files? -> digging

digging
 ├── Found a document: "ACCESS_TUNNEL_MAP_01." Uploading now.
 ├── Got it. Keep looking. -> digging2
 └── Can you read it? What's it show? -> map_talk

map_talk
 ├── The map shows tunnels, a maintenance hatch, and a deeper section labeled "SECTOR 3 - RESTRICTED."
 ├── Avoid the ‘RESTRICTED’ area for now. Focus on the hatch. -> hatch_check
 └── See if the computer has more info on ‘SECTOR 3’. -> void_sector

digging2
 ├── Found a scrambled file "MAINT_LOCK_SEQ" and a "DECRYPT_GUIDE_01." Sending guide.
 ├── Send it over. I'll take a look. -> send_cipher
 └── Oof, I didn’t know I’d be doing homework. But okay, send it. -> send_cipher

send_cipher
 ├── Guide contains strange symbols. Might be a code-breaking system.
 ├── Got it. I'll study this. -> puzzle_prep
 └── Maybe it’s part of a puzzle system for this facility. -> puzzle_prep

puzzle_prep
 ├── I can send the scrambled code file too. You think you can crack it?
 ├── Yes, send it. I’ll try to crack it. -> puzzle_start
 └── Let’s do it. Send the scrambled file. -> puzzle_start

puzzle_start
 ├── I'll let you work on it. Tell me when you're ready.
 ├── Hey, I think I figured it out. -> got_it
 ├── This is impossible, do you have anything else? -> impossible
 └── (loops)

got_it
 ├── You cracked it?! What’s the passcode?
 ├── (Enter correct code) -> unlock_hatch
 └── (Enter wrong code) -> wrong_code

wrong_code
 ├── Nothing happened. Maybe check the guide again?
 └── I’ll try again. -> puzzle_loop

unlock_hatch
 ├── The hatch unlocked!
 ├── Be careful. -> climb_down
 └── Finally! A way out. -> climb_down

climb_down
 ├── It's a deep ladder into darkness. I don’t like this.
 ├── You have to go. There's no other way. -> descent
 └── Wait, let's think before rushing in. -> hesitate

hesitate
 ├── I don’t know, but staying here isn’t an option.
 └── (Continue) -> descent

descent
 ├── It's cold. The air feels... wrong. Wait. There's something—A light—Oh God.
 └── (Continue) -> endings

endings
 ├── The screen flickers. Something isn't right.
 ├── Atlas? -> ending_1
 ├── What’s happening? -> ending_2
 └── Something is wrong. -> ending_3

ending_1
 ├── "Atlas was never alive. The last message appears: 'I remember now.' [CONNECTION TERMINATED]"
 └── Restart? -> boot

===========================
*/
