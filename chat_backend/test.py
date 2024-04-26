import redis
import json

r = redis.StrictRedis(host='localhost', port=6379, db=0)


def redis_update_prompt(key, query):
    data = r.get(key)
    print(data)
    data = json.loads(data)
    data['prompt'].append(query)
    r.set(key, json.dumps(data))


data =  {
    'user_id': 1,
    'prompt': []
}
data = json.dumps(data)
r.set('user_data', data)
res = r.get('user_data')
print(res)
redis_update_prompt('user_data', {'role': 'user', 'content': 'Hi'})
res = r.get('user_data')
print(res)