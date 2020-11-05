const express = require('express');
const Cars = require('../../data/models/dbHelpers');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const response = await Cars.add(req.body);

    if (!response)
      return res.status(404).json({ error: 'No car info provided to add.' });

    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const updateFields = ['vin', 'make', 'model', 'mileage', 'type', 'status'];
    const answerFields = Object.keys(req.body);
    const validFields = answerFields.every((answer) =>
      updateFields.includes(answer)
    );

    if (!validFields) {
      throw new Error('Invalid update request.');
    }

    const response = await Cars.update(req.params.id, req.body);

    if (!response)
      return res.status(404).json({ error: 'Car does not exist.' });

    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const response = await Cars.remove(req.params.id);

    if (!response)
      return res.status(400).json({ error: 'Car does not exist.' });

    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const response = await Cars.findById(req.params.id);

    if (!response)
      return res.status(404).json({ error: 'This car does not exist.' });

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const response = await Cars.find();

    if (!response) return res.status(404).json({ error: 'No cars found.' });

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
