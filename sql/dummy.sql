-- users 테이블 더미 데이터
INSERT INTO users (email, name, password) VALUES 
('test@gmail.com', 'test', '1234'),
('bob@naver.com', 'Bob', 'password2'),
('carol@gmail.com', 'Carol', 'password3'),
('dave@hanmail.com', 'Dave', 'password4'),
('eve@google.com', 'Eve', 'password5'),
('frank@gmail.com', 'Frank', 'password6'),
('grace@nate.com', 'Grace', 'password7'),
('hank@daum.net', 'Hank', 'password8'),
('irene@kakao.com', 'Irene', 'password9'),
('jack@naver.com', 'Jack', 'password10');

-- articles 테이블 더미 데이터
INSERT INTO articles (users_id, title, content) VALUES 
(1, 'The Enchanting Forest', 'Alice shares her experiences from her visit to an enchanting forest with mystical creatures.'),
(2, 'Tech Advancements 2023', 'Bob discusses the top 10 technological advancements in 2023.'),
(3, 'Secret to Perfect Pancakes', 'Carol unveils her secret recipe for making the fluffiest pancakes.'),
(4, 'Exploring Outer Space', 'Dave talks about the mysteries and explorations in the outer space.'),
(5, 'The History of Coffee', 'Eve explores the rich history and culture behind our everyday coffee.'),
(6, 'Climbing the Highest Peak', 'Frank narrates his adventurous journey of climbing the highest peak in the world.'),
(7, 'Understanding Artificial Intelligence', 'Grace provides insights into the evolving world of artificial intelligence and its applications.'),
(8, 'Top 5 Beach Destinations', 'Hank introduces the top 5 beach destinations for your next summer getaway.'),
(9, 'Gourmet Cooking at Home', 'Irene shares tips and tricks for preparing gourmet meals at home.'),
(10, 'Virtual Reality: The Future', 'Jack discusses the future of virtual reality and its potential impact on various industries.');

-- replies 테이블 더미 데이터
INSERT INTO replies (users_id, articles_id, content) VALUES 
(2, 1, 'The forest journey sounds magical! Would love to visit one day.'),
(3, 1, 'Your story is so inspiring, Alice!'),
(1, 2, 'Very insightful article, Bob. Thanks for sharing the advancements in tech.'),
(4, 2, 'Technology is advancing at such a rapid pace! Great read.'),
(2, 3, 'The pancakes were delicious, thanks for the secret recipe, Carol!'),
(5, 3, 'Absolutely love this, Carol. Perfect for Sunday brunch!'),
(6, 4, 'Space has always been a mystery to me. Thanks for sharing, Dave!'),
(7, 4, 'Very intriguing, Dave. Makes me want to learn more about our universe.'),
(8, 5, 'A cup of coffee is all I need to start my day. Thanks for sharing, Eve!'),
(9, 5, 'Wonderful article, Eve! The history behind coffee is fascinating.');