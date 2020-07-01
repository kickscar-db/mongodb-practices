import unittest
from pymongo import MongoClient
from pymongo.errors import OperationFailure

from config.config import dbconfig


class TestPymongo(unittest.TestCase):

    def setUp(self):
        self.client = MongoClient(**dbconfig['connection'])
        db = self.client[dbconfig['connection']['authSource']]
        self.collection = db[dbconfig['collection']]

    def test_connect(self):
        try:
            server_info = self.client.server_info()
        except OperationFailure as ex:
            self.fail(ex)

    def test_insert_one(self):
        result = self.collection.insert_one({'value': 10})
        result = self.collection.find_one({'_id': result.inserted_id})
        self.assertEqual(result['value'], 10)

    def tearDown(self):
        self.collection.drop();
        self.client.close()


if __name__ == '__main__':
    unittest.main()
