import unittest
from pymongo import MongoClient
from config import dbconfig

#
#  simple test unit
#


class TestPymongo(unittest.TestCase):

    """
    Test for MongoDB CRUD with pymongo
    """

    def setUp(self):
        self.client = MongoClient(**dbconfig['connection'])
        db = self.client[dbconfig['connection']['authSource']]
        self.collection = db[dbconfig['collection']]

    def test_connect(self):
        server_info = self.client.server_info()
        self.assertEqual(server_info['ok'], 1.)

    def test_insert_one(self):
        result = self.collection.insert_one({'value': 10})
        result = self.collection.find_one({'_id': result.inserted_id})

        self.assertEqual(result['value'], 10)

    def tearDown(self):
        self.client.close()


if __name__ == '__main__':
    unittest.main()
