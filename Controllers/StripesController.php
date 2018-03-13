<?php

class Stripes extends Controller
{
	public $model;

	public function __construct() {
		$this->load_model('Stripe');
		$this->model = new Stripe();
	}

	public function index()
	{		
		$this->render('index');
	}
}
