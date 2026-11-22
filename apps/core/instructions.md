# Functionality
The modmail bot on discord should be able to:
1. Detect if a message was sent in DMs.
  - If the message was a new message with no existing tickets under the user ID:
    = Determine which server the user wants to contact
    = Check if that server has modmail enabled

## Cache / Temp data
1. (Open) Ticket data: Server ID (pk), Channel ID, Opener ID, Opener Name, Time Opened

## Variable List
{count} - Total Ticket count
{username} - Discord Opener Username