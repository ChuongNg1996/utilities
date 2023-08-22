/*
HOW TO USE: 
+ To add new node

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
            parent: model,
            text: { name: "Static Model" }
        };
        var modelDynamic= {
            parent: model,
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
                    text: { name: "Black Box" }
                };
                    var modelTimeBlackSV= {
                        parent: modelTimeBlack, collapsed: collapseVal,
                        text: { name: "Support Vector"}
                    };
                    var modelTimeBlackGP= {
                        parent: modelTimeBlack, collapsed: collapseVal,
                        text: { name: "Gaussian Process"}
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
                    text: { name: "White Box" }
                };
                    var modelTimeWhiteWaterUnder= {
                        parent: modelTimeWhite,
                        text: { name: "Underwater"}
                    };
                    var modelTimeWhiteWaterSurface= {
                        parent: modelTimeWhite,
                        text: { name: "Water Surface"}
                    };
                    var modelTimeWhiteLand= {
                        parent: modelTimeWhite,
                        text: { name: "Land"}
                    };
                    var modelTimeWhiteDrone= {
                        parent: modelTimeWhite,
                        text: { name: "Drone"}
                    };

    // ------------------------ EXCITATION SIGNAL ------------------------ //
    var excSig = {
        parent: sysIden, collapsed: collapseVal, HTMLclass: 'subRoot',
        text: { name: "Excitation Signal" }
    };
        var excSigNoModel = {
            parent: excSig,
            text: { name: "Model Less" }
        };
        var excSigModelBased = {
            parent: excSig,
            text: { name: "Model Based" }
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
                        // ACO
                        var optimMetaHeuristicPopACO= {
                            parent: optimMetaHeuristicPop, collapsed: collapseVal,
                            text: { name: "Ant Colony Optimization (ACO)" }
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
                var optimProSpecHeuristic= {
                    parent: optimHeuristic,
                    text: { name: "Problem-Specific Heuristic Algorithms" }
                };
            var optimApproxAlgo= {
                parent: optimApprox, collapsed: collapseVal,
                text: { name: "Approximate Algorithms" }
            };
                var optimApproxAlgoLS= {
                    parent: optimApproxAlgo, collapsed: collapseVal,
                    text: { 
                        name: "Least-Squares Optimization"}
                };

// ------------------------ ANALYTICAL METHODS ------------------------ //
    var analyticalMethod = {
        parent: sysIden, collapsed: collapseVal, HTMLclass: 'subRoot',
        text: { name: "Analytical Methods" }
    };

// ------------------------ APPLICATIONS ------------------------ //
    var application = {
        parent: sysIden, collapsed: collapseVal, HTMLclass: 'subRoot',
        text: { name: "Application" }
    };
        var control = {
            parent: application, collapsed: collapseVal,
            text: { name: "Control System" }
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
        other: "Others: Nomoto 2nd-order model, zigzag manoeuvre, scale ship"
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
        other: "Others: zigzag/turning circle maneuvers, simulate a maneuver guided by a PD heading controller"
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
    parent: control, HTMLclass: 'paper',
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
        other: "Others: 3 DOF maneuvers, zigzag/turning, JARI-USV"
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
        other: "Others: zigzag maneuver, data generated from simulation"
    }
};

// Paper 18
var paper_18 = {
    parent: optimApproxAlgoLS, HTMLclass: 'paper',
    text: { 
        paper: "A Novel Parameter Identification Algorithm for 3-DOF Ship Maneuvering Modelling Using Nonlinear Multi-Innovation", 
        source: "2022, Journal of Marine Science and Engineering (Q1)", 
        author: "Baigang Zhao , Xianku Zhang * and Cailei Liang",
        abstract: "Idea: (Seemingly) Recursive least-squares (RLS) method with combined multi-innovation and nonlinear innovation",
        other: "Others: 3 DOF MMG model, zigzag/turning"
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
        other: "Others: LS-SVM, 3 DOF Abkowitz model, zigzag and turning, data collection frequency: 10 Hz"
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
                                    
                                    //SVM
                                    modelTimeBlackSV,
                                        paper_3, paper_13, paper_17,
                                    //GP
                                    modelTimeBlackGP,
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
                                                paper_12, paper_15,
                                modelTimeWhite,
                                    modelTimeWhiteWaterUnder,
                                    modelTimeWhiteWaterSurface,
                                    modelTimeWhiteLand,
                                    modelTimeWhiteDrone,
                    excSig,
                        excSigNoModel,
                        excSigModelBased,
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
                                        // ACO
                                        optimMetaHeuristicPopACO,
                                            paper_20,
                                        // GWO
                                        optimMetaHeuristicPopGWO,
                                            paper_2, paper_1, paper_6,
                                        // TO-CSA
                                        optimMetaHeuristicPopTOSCA,
                                            paper_9,
                                optimProSpecHeuristic,
                            optimApproxAlgo,
                                optimApproxAlgoLS,
                                    paper_18,
                    analyticalMethod,
                        paper_7,
                    application,

                        // Control Applications
                        control, 
                            paper_8,
                        simulation,];


