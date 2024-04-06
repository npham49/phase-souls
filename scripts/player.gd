extends CharacterBody2D
# Source: https://www.youtube.com/watch?v=KceMokK2qFA&ab_channel=DevWorm
const max_speed = 160
const accel = 700
const friction = 600

var input = Vector2.ZERO

func _physics_process(delta):
	player_movement(delta)
	
func get_input():
	input.x = int(Input.is_action_pressed("right")) - int(Input.is_action_pressed("left"))
	input.y = int(Input.is_action_pressed("down")) - int(Input.is_action_pressed("up"))
	return input.normalized()
	
func player_movement(delta):
	input = get_input()
	
	if input == Vector2.ZERO:
		if velocity.length() > (friction * delta):
			velocity -=velocity.normalized() * (friction*delta)
		else:
			velocity = Vector2.ZERO
	else:
		velocity += (input*accel*delta)
		velocity = velocity.limit_length(max_speed)
		
	move_and_slide()
