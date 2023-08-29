/*
HOW TO USE: 

+ To add new NODE (new category):

    [1] Make a function with the format: 
        var [NODE variable name]= {
            parent: [parent variable name], collapsed: collapseVal,
            text: { name: [NODE string name] }
        };

    [2] add the [NODE variable name] in [chart_config] variable below, in correct order.

+ To add new PAPER:
    
    [1] Each PAPER provides various techniques such that they (the PAPERS) can be categoried in different ways. 
        Think about what is the most prominent aspect and put the PAPER in the according NODE that reflect that aspect.
        The most prominent aspect should be subjective more than objective, that it reflects the user need.
        Multiple parents are not programmed.

        E.g.: A paper about NARX with SVM for ship model, can be either put on [1] ship NODE or [2] NARX NODE or [3] SVM NODE,
        Only one, depends on what aspect user decide the most notable aspect.
    
    [2] If the NODE doesn't exist, look at above section to make the NODE.

    [3] Make a function with format:
        var paper_[paper number] = {
            parent: , HTMLclass: 'paper',
            text: { 
                paper: "", 
                source: "", 
                author: "",
                abstract: "Idea:",
                other: "Others:"
            }
        };

    [4] add the paper in [chart_config] variable below, in correct order.

*/
// API: https://fperucic.github.io/treant-js/

const collapseVal = true;

var config = {
	container: "#collapsable-example",
    rootOrientation:  'WEST', 
    nodeAlign: 'BOTTOM',
    // connectors: {type: 'step'},
    node: {
        collapsable: true
    },

    animation: {
        nodeAnimation: "easeOutBounce",
        nodeSpeed: 100,
        connectorsAnimation: "bounce",
        connectorsSpeed: 100
    }
};

var sysIden = {
    HTMLclass: 'root',
	text: { name: "System Identification" }
};
    // ------------------------ MODEL ------------------------ //
    var model = {
        parent: sysIden, collapsed: collapseVal, HTMLclass: 'subRoot',
        text: { name: "Model" }
    };
        var modelStatic = {
            parent: model, collapsed: collapseVal,
            text: { name: "Static Model" }
        };
        var modelDynamic= {
            parent: model, collapsed: collapseVal,
            text: { name: "Dynamic Model" }
        };
            var modelFreq = {
                parent: modelDynamic,
                text: { name: "Frequency Domain" }
            };
            var modelTime= {
                parent: modelDynamic,
                text: { name: "Time Domain" }
            };
                var modelTimeBlack= {
                    parent: modelTime, collapsed: collapseVal,
                    text: { name: "Black Box/Grey Box" }
                };
                    var modelTimeBlackKernel= {
                        parent: modelTimeBlack, collapsed: collapseVal, HTMLclass: "topicNode",
                        text: { 
                            name: "Kernel Methods",
                            desc: "Learn a nonlinear function by constructing new a linear function with kernel (similarity function), where the size of this new linear function is independent of [number of parameters] and depend entirely on [number of data points]. Then, we identify parameters [alpha] of the new linear function. After that, either [1] use the new linear function to predict directly, or [2] transform it back to original function by some trick, depends on the type of kernel we choose"}
                    };
                        var modelTimeBlackSV= {
                            parent: modelTimeBlackKernel, collapsed: collapseVal,
                            text: { name: "Support Vector Machine"}
                        };
                        var modelTimeBlackGP= {
                            parent: modelTimeBlackKernel, collapsed: collapseVal,
                            text: { name: "Gaussian Process"}
                        };
                        var modelTimeBlackKRG= {
                            parent: modelTimeBlackKernel, collapsed: collapseVal,
                            text: { name: "Kernel Ridge Regression"}
                        };
                    var modelTimeBlackNN = {
                        parent: modelTimeBlack, collapsed: collapseVal,
                        text: { name: "Neural Network"}
                    };
                        var modelTimeBlackFFNN = {
                            parent: modelTimeBlackNN, collapsed: collapseVal,
                            text: { name: "Feed-forward NN"}
                        };
                            var modelTimeBlackFFNNPrior = {
                                parent: modelTimeBlackFFNN, collapsed: collapseVal,
                                text: { name: "+ Prior"}
                            };                       
                        var modelTimeBlackRNN = {
                            parent: modelTimeBlackNN, collapsed: collapseVal,
                            text: { name: "Recurrent NN"}
                        };  
                            var modelTimeBlackLTSM = {
                                parent: modelTimeBlackRNN, collapsed: collapseVal,
                                text: { name: "Long Short-term Memory"}
                            }; 
                var modelTimeWhite= {
                    parent: modelTime, collapsed: collapseVal,
                    text: { name: "White Box/Grey Box" }
                };
                    var modelTimeWhiteWaterUnder= {
                        parent: modelTimeWhite,
                        text: { name: "Underwater"}
                    };
                    var modelTimeWhiteWaterSurface= {
                        parent: modelTimeWhite,
                        text: { name: "Water Surface"}
                    };
                        var WaterSurfaceNomoto= {
                            parent: modelTimeWhiteWaterSurface,
                            text: { name: "Nomoto"}
                        };
                        var WaterSurfaceAbkowitz= {
                            parent: modelTimeWhiteWaterSurface,
                            text: { name: "Abkowitz"}
                        };
                    var modelTimeWhiteLand= {
                        parent: modelTimeWhite,
                        text: { name: "Land"}
                    };
                    var modelTimeWhiteDrone= {
                        parent: modelTimeWhite,
                        text: { name: "Drone"}
                    };
        var modelEnsemble= {
            parent: model, collapsed: collapseVal,
            text: { name: "Ensemble Model" }
        };
            var modelEnsembleBagging= {
                parent: modelEnsemble, collapsed: collapseVal,
                text: { name: "Bagging" }
            };   
            var modelEnsembleStacking= {
                parent: modelEnsemble, collapsed: collapseVal,
                text: { name: "Stacking" }
            }; 
            var modelEnsembleBoosting= {
                parent: modelEnsemble, collapsed: collapseVal,
                text: { name: "Boosting" }
            }; 
    // ------------------------ EXCITATION SIGNAL ------------------------ //
    var excSig = {
        parent: sysIden, collapsed: collapseVal, HTMLclass: 'subRoot',
        text: { name: "Excitation" }
    };
        var excSigNoModel = {
            parent: excSig,
            text: { name: "Model Less" }
        };
        var excSigModelBased = {
            parent: excSig,
            text: { name: "Model Based" }
        };
            var excSigModelBasedFIM = {
                parent: excSigModelBased,
                text: { name: "Fisher Information Matrix (FIM)" }
            };

    // ------------------------ DATA PROCESSING ------------------------ //
    var dataProcess = {
        parent: sysIden, collapsed: collapseVal, HTMLclass: 'subRoot',
        text: { name: "Data Processing" }
    };
    
    // ------------------------ OPTIMIZATION ------------------------ //
    var optim = {
        parent: sysIden, collapsed: collapseVal, HTMLclass: 'subRoot',
        text: { name: "Optimization" }
    };
        var optimExact = {
            parent: optim,
            text: { name: "Exact Methods" }
        };
        var optimApprox= {
            parent: optim, collapsed: collapseVal,
            text: { name: "Approximate Methods" }
        };
            var optimHeuristic= {
                parent: optimApprox, collapsed: collapseVal,
                text: { name: "Heuristic Algorithms" }
            };
                var optimMetaHeuristic= {
                    parent: optimHeuristic,
                    text: { name: "Meta-Heuristic Algorithms" }
                };
                    var optimMetaHeuristicSingle= {
                        parent: optimMetaHeuristic, collapsed: collapseVal,
                        text: { name: "Single-solution based" }
                    };
                    var optimMetaHeuristicPop= {
                        parent: optimMetaHeuristic, collapsed: collapseVal,
                        text: { name: "Population based" }
                    };
                        // GA
                        var optimMetaHeuristicPopGA= {
                            parent: optimMetaHeuristicPop, collapsed: collapseVal,
                            text: { name: "Genetic Algorithm (GA)" }
                        };
                        // ACO
                        var optimMetaHeuristicPopACO= {
                            parent: optimMetaHeuristicPop, collapsed: collapseVal,
                            text: { name: "Ant Colony Optimization (ACO)" }
                        };
                        // African vultures optimization algorithm 
                        var optimMetaHeuristicPopAfricanVulturesOptim = {
                            parent: optimMetaHeuristicPop, collapsed: collapseVal,
                            text: { name: "African Vultures Optimization" }
                        };
                        // Artificial gorilla troops optimizer
                        var optimMetaHeuristicPopArtificialGorillaTroopsOptim = {
                            parent: optimMetaHeuristicPop, collapsed: collapseVal,
                            text: { name: "Artificial Gorilla Troops Optimization" }
                        };
                        // GWO
                        var optimMetaHeuristicPopGWO= {
                            parent: optimMetaHeuristicPop, collapsed: collapseVal,
                            text: { name: "Grey Wolf Optimizer (GWO)" }
                        };
                        // TO-CSA
                        var optimMetaHeuristicPopTOSCA= {
                            parent: optimMetaHeuristicPop, collapsed: collapseVal,
                            text: { name: "Target-oriented Crow Search Algorithm (TO-SCA)" }
                        };
                        // Barnacles Mating Optimizer 
                        var optimMetaHeuristicPopBarnaclesMatinGOptim = {
                            parent: optimMetaHeuristicPop, collapsed: collapseVal,
                            text: { name: "Barnacles Mating Optimization" }
                        };
                        // Black Widow Optimization
                        var optimMetaHeuristicPopBlackWidowOptim = {
                            parent: optimMetaHeuristicPop, collapsed: collapseVal,
                            text: { name: "Black Widow Optimization" }
                        };
                        // Chimp Optimization
                        var optimMetaHeuristicPopChimpOptim = {
                            parent: optimMetaHeuristicPop, collapsed: collapseVal,
                            text: { name: "Chimp Optimization" }
                        };

                var optimProSpecHeuristic= {
                    parent: optimHeuristic,
                    text: { name: "Problem-Specific Heuristic Algorithms" }
                };
            var optimApproxAlgo= {
                parent: optimApprox, collapsed: collapseVal,
                text: { name: "Approximate Algorithms" }
            };
                var optimApproxAlgoGrad= {
                    parent: optimApproxAlgo, collapsed: collapseVal,
                    text: { 
                        name: "Gradient-Based Optimization"}
                };


// ------------------------ ANALYTICAL METHODS ------------------------ //
    var analyticalMethod = {
        parent: sysIden, collapsed: collapseVal, HTMLclass: 'subRoot',
        text: { name: "Analytical Methods" }
    };
        var analyticalMethodLS= {
            parent: analyticalMethod, collapsed: collapseVal, HTMLclass: 'topicNode',
            text: { 
                name: "Least-Squares Optimization",
                desc: "Use Least Square cost function to derive solution for parameters directly"}
        };

// ------------------------ APPLICATIONS ------------------------ //
    var application = {
        parent: sysIden, collapsed: collapseVal, HTMLclass: 'subRoot',
        text: { name: "Application" }
    };
        var control = {
            parent: application, collapsed: collapseVal, HTMLclass: 'topicNode',
            text: { 
                name: "Control System", 
                desc: "Application of SI in Control System (e.g.: model-based controller) & vice versa" }
        };
            var controlMPC = {
                parent: control, collapsed: collapseVal, 
                text: { name: "Model Predictive Control"}
            };
        var estimator = {
            parent: application, collapsed: collapseVal, HTMLclass: 'topicNode',
            text: { 
                name: "Estimator", 
                desc: "Application of SI in estimator (e.g.: estimate system state) & vice versa (e.g.: Using estimator to identify system)"}
        };
            var BayesFilter = {
                parent: estimator, collapsed: collapseVal,
                text: { name: "Bayes Filter"}
            };
                var KalmanFilter = {
                    parent: BayesFilter, collapsed: collapseVal,
                    text: { name: "Kalman Filter"}
                };

        var simulation = {
            parent: application, collapsed: collapseVal,
            text: { name: "Simulation" }
        };

// ------------------------ PAPER ------------------------ //

// Paper 1
var paper_1 = {
    parent: optimMetaHeuristicPopGWO, HTMLclass: 'paper',
    text: { 
        paper: "Identification modeling of ship nonlinear motion based on nonlinear innovation", 
        source: "2023, Ocean Engineer (Q1)", 
        author: "Yao Meng , Xianku Zhang, Xiufeng Zhang",
        abstract: "Idea: Identify initial model with GWO with Nonlinear Innovation (NGWO), then polish it with SVR",
        other: "Others: Nonlinear feedback theory, 3 DOF Abkowitz model,  20◦/20◦ zigzag test, 10◦/10◦ zigzag test, 30◦ turning test, vessel YUKUN"
    }
};

// Paper 2
var paper_2 = {
    parent: optimMetaHeuristicPopGWO, HTMLclass: 'paper',
    text: { 
        paper: "Grey Wolf Optimizer",
        source: "2014, Advances in Engineering Software (Q1)", 
        author: "Seyedali Mirjalili, Seyed Mohammad Mirjalili, Andrew Lewis",
        abstract: "Idea: Original Paper of GWO", 
        other: "Others: Constrained optimization"
    }
};

// Paper 3
var paper_3 = {
    parent: modelTimeBlackSV, HTMLclass: 'paper',
    text: { 
        paper: "Identification of a Surface Marine Vessel Using LS-SVM", 
        source: "2013, Journal of Applied Mathematics (Q3)", 
        author: "David Moreno-Salinas, Dictino Chaos, Jesús Manuel de la Cruz, and Joaquín Aranda",
        abstract: "Idea: Nomoto 2nd-order model used to make a grey-box model with combined inputs, Least Squares Support Vector Machines (LS-SVMs) identified that grey-box model, then inverse back to Nomoto parameters", 
        method: "Method: [1] Construct kernel K with K = x'x (or K = xx', as long as K has [NxN] dimension, N is number of data points) -> [2] Find [alpha] of new linear equation from y = [alpha]*K by Least Square -> [3] Find parameters [theta] of grey-box models by [theta] = [alpha]*x, explain in detail in eq.22 and eq.23 ",
        other: "Others: Nomoto 2nd-order model, zigzag test, scale ship"
    }
};


// Paper 4
var paper_4 = {
    parent: modelTimeBlackFFNN, HTMLclass: 'paper',
    text: { 
        paper: "System Identification Based on Completely Connected Neural Networks for Black-Box Modeling of Ship Maneuvers", 
        source: "2022, Advances in Guidance, Navigation and Control (No Rank)", 
        author: "Hong-Wei He, Zihao Wang, Zao-Jian Zou, and Yi Liu",
        abstract: "Idea: FFNN + Adam Learning Algo (Adam auto adjust learning rate for each parameters)", 
        other: "Others: zigzag/turning tests, simulate a maneuver guided by a PD heading controller"
    }
};

// Paper 5
var paper_5 = {
    parent: modelTimeBlackFFNN, HTMLclass: 'paper',
    text: { 
        paper: "Recurrent neural networks for nonparametric modeling of ship maneuvering motion", 
        source: "2022, International Journal of Naval Architecture and Ocean Engineering (Q1)", 
        author: "Lizhu Hao, Yang Han, Chao Shi, Ziying Pan",
        abstract: "Idea: turned out this is FFNN with output states used as input, not RNN",
        other: "Others: circles/zigzags, KRISO Container Ship (KCS)"
    }
};


// Paper 6
var paper_6 = {
    parent: optimMetaHeuristicPopGWO, HTMLclass: 'paper',
    text: { 
        paper: "Parameter identification of ship motion mathematical model based on full-scale trial data", 
        source: "2022, International Journal of Naval Architecture and Ocean Engineering (Q1)", 
        author: "Yao Meng, Xiufeng Zhang, Jinxin Zhu",
        abstract: "Idea: SVR identifies an initial model, then Modified GWO identifies model again, where the range of initial MGWO parameters are around that of SVR model", 
        other: "Others: 4 DOF MMG model, 20◦/20◦ zigzag test, 10◦/10◦ zigzag test, 30◦ turning test, full-scale trial data of vessel YUKUN"
    }
};

// Paper 7
var paper_7 = {
    parent: analyticalMethod, HTMLclass: 'paper',
    text: { 
        paper: "Steering model identification and control design of autonomous ship: a complete experimental study", 
        source: "2022, Ships and Offshore Structures (Q1)", 
        author: "Awanish Chandra Dubey, Anantha V. Subramanian and V. Jagadeesh Kumar",
        abstract: "Idea: Use ZigZag test data. From vessel Nomoto eq, integrate the terms, coupled with combined data points to find parameters",
        other: "Others: Nomoto model, zigzag test"
    }
};

// Paper 8
var paper_8 = {
    parent: controlMPC, HTMLclass: 'paper',
    text: { 
        paper: "Reinforcement learning-based NMPC for tracking control of ASVs: Theory and experiments", 
        source: "2022, Control Engineering Practice (Q1)", 
        author: "Andreas B. Martinsen, Anastasios M. Lekkas, Sébastien Gros",
        abstract: "Idea: use Reinforcement Learning (RL) to create a model used for Model Predictive Control (MPC)",
        other: "Others: 3-DOF Fossen model"
    }
};

// Paper 9
var paper_9 = {
    parent: optimMetaHeuristicPopTOSCA, HTMLclass: 'paper',
    text: { 
        paper: "Parameter identification and application of ship maneuvering model based on TO-CSA", 
        source: "2022, Ocean Engineering", 
        author: "Zhanshuo Zhang, Yi Zhang, Jiawei Wang, Hongbo Wang",
        abstract: "Idea: TO-CSA provides improved computational accuracy and precise identification of ship parameters with fewer data or under specific sea conditions",
        other: "Others: Nonlinear Nomoto model, zigzag test"
    }
};

// Paper 10
var paper_10 = {
    parent: modelTimeBlackRNN, HTMLclass: 'paper',
    text: { 
        paper: "On neural network identification for low‑speed ship maneuvering model", 
        source: "2022, Journal of Marine Science and Technology (Q1)", 
        author: "Kouki Wakita1 · Atsuo Maki1 · Naoya Umeda1 · Yoshiki Miyauchi1 · Tohga Shimoji1 · Dimas M. Rachman1 · Youhei Akimoto2,3",
        abstract: "Idea: RNN + Adam Learning Algo (Adam auto adjust learning rate for each parameters)",
        other: "Others: Turning-Zigzag-Berthing-Random maneuvers, compared with MMG model"
    }
};

// Paper 11
var paper_11 = {
    parent: modelTimeBlackFFNN, HTMLclass: 'paper',
    text: { 
        paper: "Nonparametric modeling of ship maneuvering motion based on self-designed fully connected neural network", 
        source: "2022, Ocean Engineering (Q1)", 
        author: "Hong-Wei He, Zi-Hao Wang, Zao-Jian Zou, Yi Liu",
        abstract: "Idea: FFNN+Adam, [Bayesian optimization + Gaussian process] is used to find optimal hyperparameter settings of the FFNN",
        other: "Others: data from the Workshop SIMMAN, 2008 (SIMMAN, 2008). The free-running model tests were conducted with the KVLCC2 ship model at Hamburg Ship Model Basin (HSVA)"
    }
};

// Paper 12
var paper_12 = {
    parent: modelTimeBlackLTSM, HTMLclass: 'paper',
    text: { 
        paper: "Identification modeling and prediction of ship maneuvering motion based on LSTM deep neural network", 
        source: "2022, Journal of Marine Science and Technology (Q1)", 
        author: "Yan Jiang1, Xian‑Rui Hou2, Xue‑Gang Wang, Zi‑Hao Wang, Zhao‑Long Yang, Zao‑Jian Zou",
        abstract: "Idea: MIMO model with LTSM network",
        other: "Others: Multiple datasets of simulated standard maneuvers (10°/10° and 20°/20° zigzag, 35° turning circle) of a KVLCC2 model are artificially polluted with white noise of various levels"
    }
};

// Paper 13
var paper_13 = {
    parent: modelTimeBlackSV, HTMLclass: 'paper',
    text: { 
        paper: "Extended State Observer-Based Parameter Identification of Response Model for Autonomous Vessels", 
        source: "2022, Journal of Marine Science and Engineering (Q1)", 
        author: "Man Zhu, Wuqiang Sun, Yuanqiao Wen and Liang Huang",
        abstract: "Idea: Introduce the extended state observer (ESO), and the well-evaluated robust weighted least square support vector regression algorithm (RW-LSSVR)",
        other: "Others: Nomoto 2nd-order model, transformed to State Space for ESO"
    }
};

// Paper 14
var paper_14 = {
    parent: modelTimeBlackFFNN, HTMLclass: 'paper',
    text: { 
        paper: "Deep learning method for 3-DOF motion prediction of unmanned surface vehicles based on real sea maneuverability test", 
        source: "2022, Ocean Engineering (Q1)", 
        author: "Jiankun Lou a, Hongdong Wang a,*, Jianyao Wang a, Qing Cai b, Hong Yi a",
        abstract: "Idea: FFNN+Adam",
        other: "Others: 3 DOF maneuvers, zigzag/turning tests, JARI-USV"
    }
};

// Paper 15
var paper_15 = {
    parent: modelTimeBlackLTSM, HTMLclass: 'paper',
    text: { 
        paper: "Data-Driven system identification of 6-DoF ship motion in waves with neural networks", 
        source: "2022, Applied Ocean Research (Q1)", 
        author: "Kevin M. Silva a,b,∗, Kevin J. Maki b",
        abstract: "Idea: LTSM+Adam",
        other: "Others: 6 DOF maneuvers, free running David Taylor Model Basin (DTMB) 5415 destroyer"
    }
};

// Paper 16
var paper_16 = {
    parent: modelTimeBlackFFNNPrior, HTMLclass: 'paper',
    text: { 
        paper: "A Physics-Informed Neural Network for the Prediction of Unmanned Surface Vehicle Dynamics", 
        source: "2022, Journal of Marine Science and Engineering (Q1)", 
        author: "Peng-Fei Xu 1,2,* , Chen-Bo Han 2, Hong-Xia Cheng 2, Chen Cheng 2 and Tong Ge 1",
        abstract: "Idea: Data are filtered by a Gaussian filtering. A physics-informed neural network (PINN) is applied, which is FFNN(+Adam) with physic-based loss function",
        other: "Others: 3 DOF maneuvers, zigzag/straight-line tests"
    }
};

// Paper 17
var paper_17 = {
    parent: modelTimeBlackSV, HTMLclass: 'paper',
    text: { 
        paper: "Black-box modeling of ship maneuvering motion based on multi-output nu-support vector regression with random excitation signal", 
        source: "2022, Ocean Engineering (Q1)", 
        author: "Yan-Yun Zhang a, Zi-Hao Wang b,c,**, Zao-Jian Zou a,d,*",
        abstract: "Idea: (Seemingly) multi-output ν(‘nu’)-Support Vector Regression (MO-ν-SVR) is used to make a direct map of input-output",
        other: "Others: zigzag test, data generated from simulation"
    }
};

// Paper 18
var paper_18 = {
    parent: analyticalMethodLS, HTMLclass: 'paper',
    text: { 
        paper: "A Novel Parameter Identification Algorithm for 3-DOF Ship Maneuvering Modelling Using Nonlinear Multi-Innovation", 
        source: "2022, Journal of Marine Science and Engineering (Q1)", 
        author: "Baigang Zhao , Xianku Zhang * and Cailei Liang",
        abstract: "Idea: (Seemingly) Recursive least-squares (RLS) method with combined multi-innovation and nonlinear innovation",
        other: "Others: 3 DOF MMG model, zigzag/turning tests"
    }
};

// Paper 19
var paper_19 = {
    parent: dataProcess, HTMLclass: 'paper',
    text: { 
        paper: "A comparison of ship manoeuvrability models to approximate ship navigation trajectories", 
        source: "2022, Ships and Offshore Structures (Q1)", 
        author: "Martin Alexandersson, Daiyong Zhang, Wengang Mao & Jonas W. Ringsberg",
        abstract: "Idea: Biased data, e.g.: significant discrepancies between the normal trajectories (u, v, r) were deleted. Then, the missing data were added using a simple linear interpolation method. The Kalman filter was used to smooth the results from ship trajectory",
        other: "Others: LS-SVM, 3 DOF Abkowitz model, zigzag/turning tests, data collection frequency: 10 Hz"
    }
};

// Paper 20
var paper_20 = {
    parent: optimMetaHeuristicPopACO, HTMLclass: 'paper',
    text: { 
        paper: "Parameters’ Identification of Vessel Based on Ant Colony Optimization Algorithm", 
        source: "2022, Mathematical Problems in Engineering (Q2)", 
        author: "Chen Zhao and Xiaojian Li",
        abstract: "Idea: Ant Colony Optimization (ACO)",
        other: "Others: 3 DOF Fossen model (reformulated to discrete nonlinear model), zigzag, CyberShip II"
    }
};

// Paper 21
var paper_21 = {
    parent: modelTimeBlackGP, HTMLclass: 'paper',
    text: { 
        paper: "Nonparametric modeling of ship maneuvering motion based on Gaussian process regression optimized by genetic algorithm", 
        source: "2021, Ocean Engineering (Q1)", 
        author: "Zi-Lu Ouyang a, Zao-Jian Zou a,b,*",
        abstract: "Idea:  Gaussian process regression optimized by genetic algorithm (GA-GPR)",
        other: "Others: zigzag/turning tests"
    }
};

// Paper 22 
var paper_22 = {
    parent: analyticalMethodLS, HTMLclass: 'paper',
    text: { 
        paper: "Modeling, parameter identification, guidance and control of an unmanned surface vehicle with experimental results", 
        source: "2022, Ocean Engineering (Q1)", 
        author: "Helmi Abrougui, Samir Nejim, Saber Hachicha, Chiheb Zaoui, Habib Dallagi",
        abstract: "Idea: LSM used to identify Resistance model (tau=f(velocity)), tau is for acceleration calculation",
        other: "Others: 3 DOF Fossen model, "
    }
};

// Paper 23 
var paper_23 = {
    parent: modelTimeBlackGP, HTMLclass: 'paper',
    text: { 
        paper: "Identification of Ship Dynamics Model Based on Sparse Gaussian Process Regression with Similarity", 
        source: "2022, Symmetry (Q2)", 
        author: "Gang Chen 1, Wei Wang 1 and Yifan Xue 2",
        abstract: "Idea: Square GPR",
        other: "Others: 3 DOF, zigzag tests, real data from KVLCC2"
    }
};

// Paper 24
var paper_24 = {
    parent: WaterSurfaceNomoto, HTMLclass: 'paper',
    text: { 
        paper: "Identification of coupled response models for ship steering and roll motionusing support vector machines", 
        source: "2021, Applied Ocean Research", 
        author: "Yan Jiang a, Xue-Gang Wang b,c, Zao-Jian Zou a,d, Zhao-Long Yang",
        abstract: "Idea: Develop Nomoto model for 3 DOF (surge, sway, yaw), input of all 3 is rudder, where some models are coupled",
        other: "Others: 3 DOF Nomoto, zigzag tests, SVM is used for SI"
    }
};

// Paper 25
var paper_25 = {
    parent: modelTimeBlackGP, HTMLclass: 'paper',
    text: { 
        paper: "Identification and Prediction of Ship Maneuvering MotionBased on a Gaussian Process with Uncertainty Propagation", 
        source: "2021, Journal of Marine Science and Engineering", 
        author: "Yifan Xue 1 , Yanjun Liu 1,, Gang Xue 1, and Gang Chen 2",
        abstract: "Idea: Gaussian Process with Uncertainty Propagation",
        other: "Others: 3 DOF motion, zigzag/turning tests, SIMMAN data"
    }
};

// Paper 26 
var paper_26 = {
    parent: KalmanFilter, HTMLclass: 'paper',
    text: { 
        paper: "An Unscented Kalman Filter Online Identification Approach fora Nonlinear Ship Motion Model Using a Self-Navigation Test", 
        source: "2021, machines (Q2)", 
        author: "Jian Zheng 1, Duowen Yan 1, Ming Yan 1, Yun Li 2, and Yabing Zhao",
        abstract: "Idea: Applying UKF to identify the parameters (instead of estimate system states) by rearranging the equation such that parameters are to be estimated, and input-output measured data are used for that",
        other: "Others: real-time SI with online receding horizon identification method, 3 DOF, zigzag tests"
    }
};


// Paper 27
var paper_27 = {
    parent: KalmanFilter, HTMLclass: 'paper',
    text: { 
        paper: "An online identification approach for anonlinear ship motion model based on a receding horizon", 
        source: "2021,  Transactions of the Institute of Measurement and Control (Q2)", 
        author: "Helmi Abrougui, Samir Nejim, Saber Hachicha, Chiheb Zaoui, Habib Dallagi",
        abstract: "Idea: Applying EKF to identify the parameters (instead of estimate system states) by rearranging the equation such that parameters are to be estimated, and input-output measured data are used for that",
        other: "Others: real-time SI with online receding horizon identification method, 3 DOF, zigzag"
    }
};

// Paper 28
var paper_28 = {
    parent: optimApproxAlgoGrad, HTMLclass: 'paper',
    text: { 
        paper: "An improved nonlinear innovation-based parameteridentification algorithm for ship models", 
        source: "2021, The Journal of Navigation (Q2)", 
        author: "Baigang Zhao, and Xianku Zhang",
        abstract: "Idea: Use nonlinear Nomoto model, apply stochaic gradient with nonlinear innovation to identify parameters",
        other: "Others: Nomoto model, zigzag/turning tests"
    }
};

// Paper 29
var paper_29 = {
    parent: modelEnsembleStacking, HTMLclass: 'paper',
    text: { 
        paper: "Ensemble learning approach based on stacking for unmanned surface vehicle’s dynamics", 
        source: "2020, Ocean Engineering (Q1)", 
        author: "Chen Cheng a, Peng-Fei Xu a,b,*, Hongxia Cheng a, Yanxu Ding a, Jinhai Zheng a, Tong Ge b, Dianhong Sun a, Jin Xu c",
        abstract: "Idea: Base learners include , Backpropagation (BPNN) (which is just FFNN with BP training), Support vector machine (SVM) with RBF kernel and SVM with Linear kernel.",
        other: "Others: 3 DOF motion, zigzag trajectories filtered by gaussian filtering method."
    }
};

// Paper 30
var paper_30 = {
    parent: modelTimeBlackKRG, HTMLclass: 'paper',
    text: { 
        paper: "Modelling of a surface marine vehicle with kernel ridge regression confidence machine", 
        source: "2019, Applied Soft Computing Journal (Q1)", 
        author: "David Moreno-Salinas, Raul Moreno, Augusto Pereira, Joaquin Aranda a, Jesus M. de la Cruz",
        abstract: "Idea:  Kernel Ridge Regression (KRR) and Kernel Ridge Regression Confidence Machine (KRRCM) for black box identification of a surface marine vehicle.",
        other: "Others: phase portrait, 20/20 10/10 zigzag/circles tests"
    }
};

// Paper 31
var paper_31 = {
    parent: modelTimeBlackKRG, HTMLclass: 'paper',
    text: { 
        paper: "Black-Box Marine Vehicle Identification with Regression Techniques for Random Manoeuvres", 
        source: "2019, electronics (Q2)", 
        author: "Raul Moreno, David Moreno-Salinas, and Joaquin Aranda",
        abstract: "Idea: techniques used in this work are ridge, kernel ridge and symbolic regression",
        other: "Others: random movement"
    }
};

// Paper 32
var paper_32 = {
    parent: controlMPC, HTMLclass: 'paper',
    text: { 
        paper: "Adaptive predictive path following control based on least squares support vector machines for underactuated autonomous vessels", 
        source: "2019, Asian Journal of Control (Q2)", 
        author: "Chenguang Liu | Huarong Zheng | Rudy Negenborn | Xiumin Chu | Shuo Xie",
        abstract: "Idea: model predictive control (MPC) with online least squares support vector machines (LS‐SVM) model",
        other: "Others: LS-SVM identifies the Nomoto model"
    }
};

// Paper 33
var paper_33 = {
    parent: modelTimeBlackLTSM, HTMLclass: 'paper',
    text: { 
        paper: "Dynamic model identification of unmanned surface vehicles using deep learning network", 
        source: "2018, Applied Ocean Research (Q1)", 
        author: "Joohyun Wooa, Jongyoung Parka, Chanwoo Yub, Nakwan Kimc",
        abstract: "Idea: LSTM+Adam",
        other: "Others: zigzag/turning tests"
    }
};

// Paper 34
var paper_34 = {
    parent: analyticalMethod, HTMLclass: 'paper',
    text: { 
        paper: "Modeling and Experimental Testing of an Unmanned Surface Vehicle with Rudderless Double Thrusters", 
        source: "2019, sensors (Q1)", 
        author: "Chunyue Li 1,y , Jiajia Jiang 1,*,y, Fajie Duan 1, Wei Liu 2 , Xianquan Wang 1, Lingran Bu 1, Zhongbo Sun 1 and Guoliang Yang 1",
        abstract: "Idea: Use vectorial model (Fossen), do various experiements. Each experiments each parameter analytically.",
        other: "Others: twin thursters no rudder"
    }
};

// Paper 35
var paper_35 = {
    parent: BayesFilter, HTMLclass: 'paper',
    text: { 
        paper: "Real-time parameter identification of ship maneuvering response model based on nonlinear Gaussian Filter", 
        source: "2022, Ocean Engineering (Q1)", 
        author: "Sisi Wang a,b, Lijun Wang a,*, Namkyun Im b, Weidong Zhang a, Xijin Li a",
        abstract: "Idea: Use nonlinear Gaussian filters to estimate parameters (instead of system states like normal usual) of Nomoto model",
        other: "Others: zigzag tests, compared with EKF"
    }
};

// Paper 36
var paper_36 = {
    parent: modelTimeBlackSV, HTMLclass: 'paper',
    text: { 
        paper: "Grey-box identification modeling of ship maneuvering motion based on LS-SVM", 
        source: "2022, Ocean Engineering (Q1)", 
        author: "Lijia Chen, Peiyi Yang, Shengwei Li, Yanfei Tian, Guangqiang Liu, Guozhu Hao",
        abstract: "Idea: LS-SVM identifies 4 DOF MMG model",
        other: "Others: zigzag/turning tests"
    }
};

// Paper 37
var paper_37 = {
    parent: optimMetaHeuristicPopGA, HTMLclass: 'paper',
    text: { 
        paper: "Ship Model Identification with Genetic Algorithm Tuning", 
        source: "2021, Applied Science (Q2)", 
        author: "Anna Miller",
        abstract: "Idea: GA to identify State Space model of ship.",
        other: "Others:  state space, free-running, real-time, applied for MPC"
    }
};

// Paper 38
var paper_38 = {
    parent: modelTimeBlackGP, HTMLclass: 'paper',
    text: { 
        paper: "System identification of ship dynamic model based on Gaussian process regression with input noise", 
        source: "2020, Ocean Engineering (Q1)", 
        author: "Yifan Xue, Yanjun Liu, Chen Ji, Gang Xue, Shuting Huang",
        abstract: "Idea: identify 3 DOF NARX model for ship with input noisy Gaussian Process (NIGP)",
        other: "Others: zigzag/turning tests"
    }
};

// Paper 39
var paper_39 = {
    parent: modelTimeBlackSV, HTMLclass: 'paper',
    text: { 
        paper: "Experimental investigation of shallow water effect on vessel steering model using system identification method", 
        source: "2020, Ocean Engineering (Q1)", 
        author: "Haitong Xu a, M.A. Hinostroza a, Zihao Wang a,b, C. Guedes Soares a,",
        abstract: "Idea: Optimal Truncated LS-SVM to estimate nonlinear Nomoto model",
        other: "Others: zigzag/circle/free-running tests"
    }
};

// Paper 40
var paper_40 = {
    parent: modelEnsembleBagging, HTMLclass: 'paper',
    text: { 
        paper: "White-Black-Box Hybrid Model Identification Based on RM-RF for Ship Maneuvering", 
        source: "2019, IEEE Access (Q1)", 
        author: "Bin Mei; Licheng Sun; Guoyou Shi",
        abstract: "Idea: A new system identification scheme based on model reference (MMG is picked as ref model) and random forest (RM-RF)",
        other: "Others: 35◦ turning circle and 20◦=10◦ zigzag tests"
    }
};

// Paper 41
var paper_41 = {
    parent: modelTimeBlackGP, HTMLclass: 'paper',
    text: { 
        paper: "Non-parametric dynamic system identification of ships using multi-output Gaussian Processes", 
        source: "2018, Ocean Engineering (Q1)", 
        author: "Wilmer Ariza Ramire, Zhi Quan Leong, Hung Nguyen, Shantha Gamini Jayasinghe",
        abstract: "Idea: identify 4 DOF NARX model for ship with multioutput Gaussian processes",
        other: "Others: zigzag tests"
    }
};

// Paper 42
var paper_42 = {
    parent: KalmanFilter, HTMLclass: 'paper',
    text: { 
        paper: "System Identification of Nonlinear Vessel Steering", 
        source: "2015, Journal of Offshore Mechanics and Arctic Engineering (Q2)", 
        author: "Lokukaluge P. Perera, P. Oliveira, C. Guedes Soares",
        abstract: "Idea: Apply extended Kalman filter (EKF) to identify second-order modified Nomoto model",
        other: "Others: free steering tests"
    }
};

// Paper 43
var paper_43 = {
    parent: modelTimeBlackSV, HTMLclass: 'paper',
    text: { 
        paper: "System identification modelling of ship manoeuvring motion based on ε - support vector regression", 
        source: "2015, Journal of Hydrodynamics", 
        author: "WANG Xue-gang, ZOU Zao-jian, HOU Xian-rui, XU Feng",
        abstract: "Idea: ε-Support Vector Regression to identify Abkowitz model",
        other: "Others: 10/10, 20/20 zigzag and 35 turning tests "
    }
};

// Paper 44
var paper_44 = {
    parent: WaterSurfaceAbkowitz, HTMLclass: 'paper',
    text: { 
        paper: "Ship Maneuvering Model Optimization for Improved Identification with Less Excitation", 
        source: "2023, Ocean Engineering (Q1)", 
        author: "Shiyang Li, Tongtong Wang, Guoyuan Li, Houxiang Zhang",
        abstract: "Idea: Simplify 3 DOF Abkowitz model by performing Correletation & Sensitivity analysis to find which parameter is significant. Then omit the insignificant ones",
        other: "Others: Correlation analysis is a method to discover the relationship among parameters and the strength of that relationship. Sensitivity analysis is used to determine the importance of the parameters that have the same effect on the output."
    }
};

// Paper 45
var paper_45 = {
    parent: excSigModelBasedFIM, HTMLclass: 'paper',
    text: { 
        paper: "On Optimal Test Signal Design and Parameter Identification Schemes for Dynamic Takagi-Sugeno Fuzzy Models Using the Fisher Information Matrix", 
        source: "2022, International Journal of Fuzzy Systems (Q2)", 
        author: "Matthias Himmelsbach, Andreas Kroll",
        abstract: "Idea: optimal experiment design (OED) for locally affine Takagi-Sugeno (TS) fuzzy models based on the Fisher Information Matrix (FIM) with various criteria (i.e.: J_det, J_eig, J_str, J_tr, J_sens)",
        lit: "Lit Review: In process model-free designs, space-filling approaches are used. Model based approaches are often optimal experiment designs (OED) that use the model equations to minimize some criterion."
    },
    // image: "../sysIden/img/paper_45_1.png"
};

// Paper 46
var paper_46 = {
    parent: excSigModelBasedFIM, HTMLclass: 'paper',
    text: { 
        paper: "Optimal design of excitation signal for identification of nonlinear ship manoeuvring model", 
        source: "2020, Ocean Engineering (Q1)", 
        author: "Zihao Wang. Guedes Soares, Zaojian Zou",
        abstract: "Idea: FIM with D-optimality and ACO optim for Abkowitz model",
        lit: "Lit Review: design of experiments (DOE). Only a few studies have considered the DOE for ship identification:...",
        other: "Others: shown 'Parameter distribution comparison' chart, shown 'convergence traces' graph"
    }
};

// Paper 47
var paper_47 = {
    parent: excSigModelBasedFIM, HTMLclass: 'paper',
    text: { 
        paper: "Optimal excitation trajectories for mechanical systems identification", 
        source: "2021, Automatica (Q1)", 
        author: "Taeyoon Lee, Bryan D. Lee, Frank C. Park",
        abstract: "Idea: FIM based trajectory design for SI of various mechanical systems",
        lit: "Lit Review: ... classical optimal experimental design criteria that are directly associated with the parameter estimation variance (Donev, Atkinson, & Tobias, 2007; Moakher & Batchelor, 2006; Pukelsheim, 2006; Schwabe, 2012); minimize the prediction variance of specific outputs of interest (Pukelsheim, 2006); directly maximized over the input space", 
        other: "Others: 2-dof SCARA robot, AMBIDEX manipulator, Atlas V5 humanoid robot"
    }
};

// Paper 48
var paper_48 = {
    parent: excSigModelBasedFIM, HTMLclass: 'paper',
    text: { 
        paper: "Optimal input signal design for fractional-order system identification", 
        source: "2019, Bulletin of the Polish Academy of Sciences (Q3)", 
        author: "W Jakowluk.",
        abstract: "Idea: fractional-order systems identification with optimal input signal design",
        other: "Others: Oustaloup recursive approximation (ORA) method is used to obtain the fractional-order differentiation. The fundamental principle of system parameter estimation is to maximize the sensitivity of the state variable to the unidentified parameters (e.g.: a small change of the parameters changes output meaningfully, indicate that this parameter (and thus its multiplication with the input) is significant)"
    }
};

// Paper 49
var paper_49 = {
    parent: optimMetaHeuristicPopBarnaclesMatinGOptim, HTMLclass: 'paper',
    text: { 
        paper: "Barnacles Mating Optimizer A new bio-inspired algorithm for solving", 
        source: "2020, Engineering Applications of Artificial Intelligence (Q1)", 
        author: "Mohd Herwan Sulaiman a, Zuriani Mustaffa b, Mohd Mawardi Saari a, Hamdan Daniyal a",
        abstract: "Idea:  a novel bio-inspired optimization algorithm namely the Barnacles Mating Optimizer (BMO)",
        // other: "Others:"
    }
};

// Paper 50
var paper_50 = {
    parent: optimMetaHeuristicPopBlackWidowOptim, HTMLclass: 'paper',
    text: { 
        paper: "Black Widow Optimization Algorithm: A novel meta-heuristic approach for solving engineering optimization problems", 
        source: "2020, Engineering Applications of Artificial Intelligence (Q1)", 
        author: "Vahideh Hayyolalam, Ali Asghar Pourhaji Kazem",
        abstract: "Idea: The proposed method, Black Widow Optimization Algorithm (BWO), is inspired by the unique mating behavior of black widow spiders. This method includes an exclusive stage, namely, cannibalism. Due to this stage, species with inappropriate fitness are omitted from the circle, thus leading to early convergence",
        // other: "Others:"
    }
};

// Paper 51
var paper_51 = {
    parent: optimMetaHeuristicPopChimpOptim, HTMLclass: 'paper',
    text: { 
        paper: "Chimp optimization algorithm", 
        source: "2020, Expert Systems With Applications (Q1)", 
        author: "M. Khishe a, M.R. Mosavi b",
        abstract: "Idea: a novel metaheuristic algorithm called Chimp Optimization Algorithm (ChOA) inspired by the individual intelligence and sexual motivation of chimps in their group hunting",
        // other: "Others:"
    }
};

// Paper 52
var paper_52 = {
    parent: optimMetaHeuristicPopAfricanVulturesOptim, HTMLclass: 'paper',
    text: { 
        paper: "African vultures optimization algorithm: A new nature-inspired metaheuristic algorithm for global optimization problems", 
        source: "2021, Computers & Industrial Engineering (Q1)", 
        author: "Benyamin Abdollahzadeh a, Farhad Soleimanian Gharehchopogh a,*, Seyedali Mirjalili b,c",
        abstract: "Idea: The algorithm is named African Vultures Optimization Algorithm (AVOA) and simulates African vultures’ foraging and navigation behaviors",
        // other: "Others:"
    }
};

// Paper 53
var paper_53 = {
    parent: optimMetaHeuristicPopArtificialGorillaTroopsOptim, HTMLclass: 'paper',
    text: { 
        paper: "Artificial gorilla troops optimizer: A new nature‐inspired metaheuristic algorithm for global optimization problems", 
        source: "2021, International Journal of Intelligent Systems (Q1)", 
        author: "Benyamin Abdollahzadeh, Farhad Soleimanian Gharehchopogh, Seyedali Mirjalili",
        abstract: "Idea: In this algorithm, gorillas' collective life is mathematically formulated, and new mechanisms are designed to perform exploration and exploitation. ",
        // other: "Others:"
    }
};

// Paper 54
var paper_54 = {
    parent: optimMetaHeuristicPop, HTMLclass: 'paper',
    text: { 
        paper: "A survey of recently developed metaheuristics and their comparative analysis", 
        source: "2023, Engineering Applications of Artificial Intelligence (Q1)", 
        author: "Abdulaziz Alorf",
        abstract: "Idea: A list of 57 novel metaheuristic algorithms.",
        other: "Others: Based on the statistical results for the unimodaland multimodal functions, we declared that the GBO, PO, and MRFO algorithms have better exploration andexploitation capabilities. Based on the results for the CEC-BC-2017 benchmark functions, we found the MPA,FBI, and HBO algorithms to be the most balanced. Finally, based on the results for the constrained engineeringoptimization problems, we declared that the HBO, GBO, and MA algorithms are the most suitable. Collectively,we confidently recommend the GBO, MPA, PO, and HBO algorithms for real-world optimization problems."
    }
};

// Paper 
// var paper_ = {
//     parent: , HTMLclass: 'paper',
//     text: { 
//         paper: "", 
//         source: "", 
//         author: "",
//         abstract: "Idea:",
//         other: "Others:"
//     }
// };

// ------------------------ TREE ------------------------ //
chart_config = [config, sysIden,
                    model,
                        modelStatic,
                        modelDynamic,
                            modelFreq,
                            modelTime,
                                modelTimeBlack,
                                    modelTimeBlackKernel,
                                        //SV
                                        modelTimeBlackSV,
                                            paper_3, paper_13, paper_17, paper_36, paper_39, paper_43,
                                        //GP
                                        modelTimeBlackGP,
                                            paper_21, paper_22, paper_25, paper_38,
                                        // Kernel RG
                                        modelTimeBlackKRG,
                                            paper_30, paper_31,
                                    // Neural Network
                                    modelTimeBlackNN,
                                        // FFNN
                                        modelTimeBlackFFNN,
                                            paper_4, paper_5, paper_11, paper_14,
                                                modelTimeBlackFFNNPrior,
                                                paper_16,
                                        // RNN
                                        modelTimeBlackRNN,
                                            paper_10,
                                            // LTSM
                                            modelTimeBlackLTSM,
                                                paper_12, paper_15, paper_33,
                                modelTimeWhite,
                                    modelTimeWhiteWaterUnder,
                                    modelTimeWhiteWaterSurface,
                                        WaterSurfaceNomoto,
                                            paper_24,
                                        WaterSurfaceAbkowitz,
                                            paper_44,
                                    modelTimeWhiteLand,
                                    modelTimeWhiteDrone,
                        modelEnsemble,
                            modelEnsembleBagging,
                                paper_40,
                            modelEnsembleStacking,
                                paper_29, 
                            modelEnsembleBoosting,
                    excSig,
                        excSigNoModel,
                        excSigModelBased,
                            // Fisher Information Matrix
                            excSigModelBasedFIM,
                                paper_45, paper_46, paper_47, paper_48,
                    dataProcess,
                        paper_19,
                    optim,
                        optimExact,
                        optimApprox,
                            optimHeuristic,

                                // Meta Heuristic
                                optimMetaHeuristic,
                                    optimMetaHeuristicSingle,
                                    optimMetaHeuristicPop,
                                        paper_54,
                                        // GA
                                        optimMetaHeuristicPopGA,
                                            paper_37,
                                        // ACO
                                        optimMetaHeuristicPopACO,
                                            paper_20,
                                        // African vultures optimization algorithm 
                                        optimMetaHeuristicPopAfricanVulturesOptim,
                                            paper_52,
                                        // Artificial gorilla troops optimizer
                                        optimMetaHeuristicPopArtificialGorillaTroopsOptim,
                                            paper_53,
                                        // GWO
                                        optimMetaHeuristicPopGWO,
                                            paper_2, paper_1, paper_6,
                                        // TO-CSA
                                        optimMetaHeuristicPopTOSCA,
                                            paper_9,
                                        // Barnacles Mating Optimizer 
                                        optimMetaHeuristicPopBarnaclesMatinGOptim,
                                            paper_49,
                                        // Black Widow Optimization
                                        optimMetaHeuristicPopBlackWidowOptim,
                                            paper_50,
                                        // Chimp Optimization
                                        optimMetaHeuristicPopChimpOptim,
                                            paper_51,
                                optimProSpecHeuristic,
                            optimApproxAlgo,
                                optimApproxAlgoGrad,
                                    paper_28,
                                
                    analyticalMethod,
                        paper_7,  paper_34,
                        analyticalMethodLS,
                            paper_18, paper_22,
                    application,

                        // Control Applications
                        control, 
                            controlMPC,
                                paper_8, paper_32,
                        estimator,
                            BayesFilter,
                                paper_35,
                                KalmanFilter,
                                    paper_26, paper_27, paper_42,
                        simulation,];


