---

layout: post
title: Does Every Town In Massachussets Start With The Letter "W"?

---

The answer is no, but I've noticed that an eerie number of the towns surrounding my high school do, so I want to know if it's just me or if I'm actually surrounded by "W"s.  
There are 46 towns in Massachussets starting with the letter 'w':

```python
>>> from pprint import pprint
>>> pprint(towns)
['Wakefield',
 'Wales',
 'Walpole',
 'Waltham',
 'Ware',
 'Wareham',
 'Warren',
 'Warwick',
 'Washington',
 'Watertown',
 'Wayland',
 'Webster',
 'Wellesley',
 'Wellfleet',
 'Wendell',
 'Wenham',
 'West Boylston',
 'West Bridgewater',
 'West Brookfield',
 'West Newbury',
 'West Springfield',
 'West Stockbridge',
 'West Tisbury',
 'Westborough',
 'Westfield',
 'Westford',
 'Westhampton',
 'Westminster',
 'Weston',
 'Westport',
 'Westwood',
 'Weymouth',
 'Whately',
 'Whitman',
 'Wilbraham',
 'Williamsburg',
 'Williamstown',
 'Wilmington',
 'Winchendon',
 'Winchester',
 'Windsor',
 'Winthrop',
 'Woburn',
 'Worcester',
 'Worthington',
 'Wrentham']
```  
 
We use Google's geocoder to determine a location for each town:

```python
>>> import geocoder
>>> towns = [[name,geocoder.google(name+', MA').latlng] for name in towns]
>>> pprint(towns)
[[u'Wakefield', [42.5039395, -71.0723391]],
 [u'Wales', [42.0695393, -72.22230069999999]],
 [u'Walpole', [42.1417442, -71.2495096]],
 [u'Waltham', [42.3764852, -71.2356113]], ... ]
```
 
We use as the positon for the Cambridge School of Weston the reverse geocoding of its address:
 
```python
>>> pos = geocoder.google('45 Georgian Road, Weston, MA')
```
 
How far are these towns from the school? Find out with the handy Haversine formula:

```python
>>> from haversine import haversine
>>> towns = [{'name':name,'location':location,'distance':haversine(location,pos)} for name,location in towns]
>>> pprint(towns)
[{'distance': 21.000378673006114,
  'location': [42.5039395, -71.0723391],
  'name': u'Wakefield'},
 {'distance': 85.78299932038826,
  'location': [42.0695393, -72.22230069999999],
  'name': u'Wales'},
 {'distance': 27.200481082169212,
  'location': [42.1417442, -71.2495096],
  'name': u'Walpole'}, ... ]
```

I choose to define a town as "near" to the school if it is within 30 minutes of driving time which, at an average freeway speed limit of 70 mph, is 35 miles or 56,327 km:

```python
>>> max_distance = 56.327
>>> towns = [t for t in towns if t['distance'] < max_distance]
>>> pprint(towns)
[{'distance': 21.000378673006114,
  'location': [42.5039395, -71.0723391],
  'name': u'Wakefield'},
 {'distance': 27.200481082169212,
  'location': [42.1417442, -71.2495096],
  'name': u'Walpole'},
 {'distance': 3.164198645222955,
  'location': [42.3764852, -71.2356113],
  'name': u'Waltham'}, ... ]

```
 
There are 23 towns near the Cambridge School of Weston that start with the letter "w", which is roughly half of all "w" starting towns in Massachussets. *All in a 35 miles radius.*
 
```python
>>> pprint(towns)
 [u'Wakefield',
 u'Walpole',
 u'Waltham',
 u'Watertown',
 u'Wayland',
 u'Wellesley',
 u'Wenham',
 u'West Boylston',
 u'West Bridgewater',
 u'West Newbury',
 u'Westborough',
 u'Westford',
 u'Westminster',
 u'Weston',
 u'Westwood',
 u'Weymouth',
 u'Whitman',
 u'Wilmington',
 u'Winchester',
 u'Winthrop',
 u'Woburn',
 u'Worcester',
 u'Wrentham']
```

Which percentage of the towns nearby start with the letter "w"?

```python
>>> all_towns = [{'name':name,'position':geocoder.google(name+', MA').latlng} for name in all_towns]
>>> near_towns = [town for town in all_towns if haversine(pos,tuple(town['position'])) < max_distance]
>>> percentage = len(towns) * 100.0 / len(near_towns)
>>> print percentage
13.372093023255815
```

The percentage of towns in the Weston are that start with the letter 'w' is a starkingly high 13,4%.  
  
*I was goddamn right.*
 